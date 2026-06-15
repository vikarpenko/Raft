package org.naukma.raft.service;

import lombok.RequiredArgsConstructor;
import org.naukma.raft.dto.request.ChatMessagePatchRequest;
import org.naukma.raft.dto.request.ChatMessageRequest;
import org.naukma.raft.dto.response.ChatMessageResponse;
import org.naukma.raft.dto.response.UserSummaryResponse;
import org.naukma.raft.entity.ChatMessage;
import org.naukma.raft.entity.User;
import org.naukma.raft.entity.Workspace;
import org.naukma.raft.entity.WorkspaceMember;
import org.naukma.raft.enums.MemberRole;
import org.naukma.raft.errorsHadling.AccessDeniedException;
import org.naukma.raft.errorsHadling.NotFoundException;
import org.naukma.raft.repository.ChatMessageRepository;
import org.naukma.raft.repository.UserRepository;
import org.naukma.raft.repository.WorkspaceMemberRepository;
import org.naukma.raft.repository.WorkspaceRepository;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Comparator;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ChatService {

    private final ChatMessageRepository chatMessageRepository;
    private final WorkspaceRepository workspaceRepository;
    private final WorkspaceMemberRepository memberRepository;
    private final UserRepository userRepository;

    @Transactional(readOnly = true)
    public List<ChatMessageResponse> getWorkspaceMessages(Long userId, Long workspaceId, int limit) {
        Workspace workspace = getWorkspace(workspaceId);
        requireMember(workspace, userId);

        int safeLimit = Math.min(Math.max(limit, 1), 100);

        return chatMessageRepository
                .findByWorkspace_IdOrderByCreatedAtDesc(workspaceId, PageRequest.of(0, safeLimit))
                .stream()
                .sorted(Comparator.comparing(ChatMessage::getCreatedAt))
                .map(message -> mapToResponse(message, userId))
                .toList();
    }

    @Transactional
    public ChatMessageResponse sendMessage(Long userId, Long workspaceId, ChatMessageRequest request) {
        Workspace workspace = getWorkspace(workspaceId);
        requireMember(workspace, userId);

        User sender = getUser(userId);

        ChatMessage message = ChatMessage.builder()
                .workspace(workspace)
                .sender(sender)
                .content(request.getContent().trim())
                .build();

        return mapToResponse(chatMessageRepository.save(message), userId);
    }

    @Transactional
    public ChatMessageResponse updateMessage(Long userId, Long messageId, ChatMessagePatchRequest request) {
        ChatMessage message = getMessage(messageId);

        requireMember(message.getWorkspace(), userId);
        requireSender(message, userId);

        message.setContent(request.getContent().trim());
        message.setEdited(true);

        return mapToResponse(chatMessageRepository.save(message), userId);
    }

    @Transactional
    public void deleteMessage(Long userId, Long messageId) {
        ChatMessage message = getMessage(messageId);

        requireMember(message.getWorkspace(), userId);
        requireSender(message, userId);

        chatMessageRepository.delete(message);
    }

    private ChatMessage getMessage(Long messageId) {
        return chatMessageRepository.findDetailedById(messageId)
                .orElseThrow(() -> new NotFoundException("Chat message not found"));
    }

    private Workspace getWorkspace(Long workspaceId) {
        return workspaceRepository.findById(workspaceId)
                .orElseThrow(() -> new NotFoundException("Workspace not found"));
    }

    private User getUser(Long userId) {
        return userRepository.findById(userId)
                .orElseThrow(() -> new NotFoundException("User not found"));
    }

    private MemberRole requireMember(Workspace workspace, Long userId) {
        if (workspace.getOwner().getId().equals(userId)) {
            return MemberRole.ADMIN;
        }

        return memberRepository.findByWorkspace_IdAndUser_Id(workspace.getId(), userId)
                .map(WorkspaceMember::getRole)
                .orElseThrow(() -> new AccessDeniedException("You do not have access to this chat"));
    }

    private void requireSender(ChatMessage message, Long userId) {
        if (!message.getSender().getId().equals(userId)) {
            throw new AccessDeniedException("You can edit or delete only your own messages");
        }
    }

    private ChatMessageResponse mapToResponse(ChatMessage message, Long currentUserId) {
        Workspace workspace = message.getWorkspace();
        User sender = message.getSender();

        return ChatMessageResponse.builder()
                .id(message.getId().toString())
                .workspaceId(workspace.getId().toString())
                .workspaceName(workspace.getName())
                .sender(toUserSummary(sender))
                .content(message.getContent())
                .edited(message.isEdited())
                .ownMessage(sender.getId().equals(currentUserId))
                .createdAt(message.getCreatedAt())
                .updatedAt(message.getUpdatedAt())
                .build();
    }

    private UserSummaryResponse toUserSummary(User user) {
        return UserSummaryResponse.builder()
                .id(user.getId().toString())
                .username(user.getUsername())
                .firstName(user.getFirstName())
                .lastName(user.getLastName())
                .avatar(user.getAvatar())
                .build();
    }
}