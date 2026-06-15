package org.naukma.raft.service;

import lombok.RequiredArgsConstructor;
import org.naukma.raft.dto.request.NotePatchRequest;
import org.naukma.raft.dto.request.NoteRequest;
import org.naukma.raft.dto.response.NoteResponse;
import org.naukma.raft.dto.response.UserSummaryResponse;
import org.naukma.raft.entity.Folder;
import org.naukma.raft.entity.Note;
import org.naukma.raft.entity.User;
import org.naukma.raft.entity.Workspace;
import org.naukma.raft.errorsHadling.AccessDeniedException;
import org.naukma.raft.errorsHadling.NotFoundException;
import org.naukma.raft.repository.FolderRepository;
import org.naukma.raft.repository.NoteRepository;
import org.naukma.raft.repository.UserRepository;
import org.naukma.raft.repository.WorkspaceMemberRepository;
import org.naukma.raft.repository.WorkspaceRepository;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.LinkedHashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class NoteService {

    private final NoteRepository noteRepository;
    private final FolderRepository folderRepository;
    private final UserRepository userRepository;
    private final WorkspaceRepository workspaceRepository;
    private final WorkspaceMemberRepository memberRepository;

    @Transactional(readOnly = true)
    public List<NoteResponse> getNotes(Long userId) {
        Set<Long> accessibleFolderIds = getAccessibleFolderIds(userId);
        if (accessibleFolderIds.isEmpty()) {
            return List.of();
        }
        return noteRepository.findByFolder_IdInOrderByUpdatedAtDesc(accessibleFolderIds)
                .stream()
                .map(note -> mapToResponse(note, userId))
                .toList();
    }

    @Transactional(readOnly = true)
    public List<NoteResponse> searchNotes(Long userId, String query, int maxResults) {
        Set<Long> accessibleFolderIds = getAccessibleFolderIds(userId);
        if (accessibleFolderIds.isEmpty() || query == null || query.isBlank()) {
            return List.of();
        }
        List<Note> found = noteRepository.searchByTitleOrContent(query.trim(), PageRequest.of(0, maxResults));
        return found.stream()
                .filter(note -> accessibleFolderIds.contains(note.getFolder().getId()))
                .map(note -> mapToResponse(note, userId))
                .toList();
    }

    @Transactional
    public NoteResponse createNote(Long userId, NoteRequest request) {
        User creator = getUser(userId);
        Folder folder = getAccessibleFolder(userId, request.getFolderId());

        Note note = Note.builder()
                .folder(folder)
                .creator(creator)
                .title(request.getTitle())
                .content(request.getContent() != null ? request.getContent() : "")
                .build();

        Note saved = noteRepository.save(note);
        return mapToResponse(saved, userId);
    }

    @Transactional
    public NoteResponse updateNote(Long userId, Long noteId, NotePatchRequest request) {
        Note note = getMutableNote(userId, noteId);

        if (request.getTitle() != null) {
            note.setTitle(request.getTitle());
        }
        if (request.getContent() != null) {
            note.setContent(request.getContent());
        }
        Note updated = noteRepository.save(note);
        return mapToResponse(updated, userId);
    }

    @Transactional
    public void deleteNote(Long userId, Long noteId) {
        Note note = getMutableNote(userId, noteId);
        noteRepository.delete(note);
    }

    private User getUser(Long userId) {
        return userRepository.findById(userId)
                .orElseThrow(() -> new NotFoundException("User not found"));
    }

    private Folder getAccessibleFolder(Long userId, Long folderId) {
        if (folderId == null) {
            throw new IllegalArgumentException("Folder ID is required");
        }
        Folder folder = folderRepository.findById(folderId)
                .orElseThrow(() -> new NotFoundException("Folder not found"));
        if (cantAccessWorkspace(userId, folder.getWorkspace())) {
            throw new AccessDeniedException("You do not have access to this folder");
        }
        return folder;
    }

    private Note getMutableNote(Long userId, Long noteId) {
        Note note = noteRepository.findById(noteId)
                .orElseThrow(() -> new NotFoundException("Note not found"));

        if (cantAccessWorkspace(userId, note.getFolder().getWorkspace())) {
            throw new AccessDeniedException("You do not have access to this note");
        }

        boolean isCreator = note.getCreator().getId().equals(userId);
        boolean isWorkspaceOwner = note.getFolder().getWorkspace().getOwner().getId().equals(userId);

        if (!isCreator && !isWorkspaceOwner) {
            throw new AccessDeniedException("Only the note creator can modify this note");
        }

        return note;
    }

    private boolean cantAccessWorkspace(Long userId, Workspace workspace) {
        return !workspace.getOwner().getId().equals(userId)
                && !memberRepository.existsByWorkspace_IdAndUser_Id(workspace.getId(), userId);
    }

    private Set<Long> getAccessibleFolderIds(Long userId) {
        Set<Long> workspaceIds = new LinkedHashSet<>();
        workspaceRepository.findByOwner_Id(userId).forEach(ws -> workspaceIds.add(ws.getId()));
        memberRepository.findByUser_Id(userId).forEach(member -> workspaceIds.add(member.getWorkspace().getId()));

        if (workspaceIds.isEmpty()) {
            return Set.of();
        }

        return folderRepository.findByWorkspace_IdInOrderByCreatedDesc(workspaceIds)
                .stream()
                .map(Folder::getId)
                .collect(Collectors.toSet());
    }

    private NoteResponse mapToResponse(Note note, Long userId) {
        boolean canEdit = note.getCreator().getId().equals(userId);
        return NoteResponse.builder()
                .id(note.getId().toString())
                .title(note.getTitle())
                .content(note.getContent())
                .createdAt(note.getCreatedAt())
                .updatedAt(note.getUpdatedAt())
                .folderId(note.getFolder().getId().toString())
                .folderName(note.getFolder().getName())
                .folderType(note.getFolder().getType())
                .canEdit(canEdit)
                .creator(UserSummaryResponse.builder()
                        .id(note.getCreator().getId().toString())
                        .username(note.getCreator().getUsername())
                        .firstName(note.getCreator().getFirstName())
                        .lastName(note.getCreator().getLastName())
                        .avatar(note.getCreator().getAvatar())
                        .build())
                .build();
    }
}