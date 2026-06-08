package org.naukma.raft.service;

import lombok.RequiredArgsConstructor;
import org.naukma.raft.dto.request.EventPatchRequest;
import org.naukma.raft.dto.request.EventRequest;
import org.naukma.raft.dto.response.EventResponse;
import org.naukma.raft.entity.Event;
import org.naukma.raft.entity.User;
import org.naukma.raft.entity.Workspace;
import org.naukma.raft.enums.WorkspaceColor;
import org.naukma.raft.enums.WorkspaceType;
import org.naukma.raft.errorsHadling.AccessDeniedException;
import org.naukma.raft.errorsHadling.ConflictException;
import org.naukma.raft.errorsHadling.NotFoundException;
import org.naukma.raft.repository.EventRepository;
import org.naukma.raft.repository.UserRepository;
import org.naukma.raft.repository.WorkspaceMemberRepository;
import org.naukma.raft.repository.WorkspaceRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.LinkedHashSet;
import java.util.List;
import java.util.Set;

@Service
@RequiredArgsConstructor
public class EventService {

    private static final WorkspaceColor PERSONAL_COLOR = WorkspaceColor.GRAY;

    private final EventRepository eventRepository;
    private final UserRepository userRepository;
    private final WorkspaceRepository workspaceRepository;
    private final WorkspaceMemberRepository memberRepository;

    @Transactional(readOnly = true)
    public List<EventResponse> getEvents(Long userId) {
        Set<Long> workspaceIds = accessibleWorkspaceIds(userId);

        if (workspaceIds.isEmpty()) {
            return List.of();
        }

        return eventRepository.findByWorkspace_IdInOrderByStartTimeAsc(workspaceIds)
                .stream()
                .map(this::mapToResponse)
                .toList();
    }

    @Transactional
    public EventResponse createEvent(Long userId, EventRequest request) {
        validateEventTime(request.getStartTime(), request.getEndTime());

        User user = getUser(userId);
        Workspace workspace = resolveWorkspace(user, request.getWorkspaceId());

        Event event = Event.builder()
                .creator(user)
                .workspace(workspace)
                .title(request.getTitle())
                .description(request.getDescription())
                .startTime(request.getStartTime())
                .endTime(request.getEndTime())
                .build();

        return mapToResponse(eventRepository.save(event));
    }

    @Transactional
    public EventResponse updateEvent(Long userId, Long eventId, EventPatchRequest request) {
        Event event = getAccessibleEvent(userId, eventId);

        LocalDateTime newStartTime = request.getStartTime() != null
                ? request.getStartTime()
                : event.getStartTime();

        LocalDateTime newEndTime = request.getEndTime() != null
                ? request.getEndTime()
                : event.getEndTime();

        validateEventTime(newStartTime, newEndTime);

        if (request.getTitle() != null) event.setTitle(request.getTitle());
        if (request.getDescription() != null) event.setDescription(request.getDescription());
        if (request.getStartTime() != null) event.setStartTime(request.getStartTime());
        if (request.getEndTime() != null) event.setEndTime(request.getEndTime());

        return mapToResponse(eventRepository.save(event));
    }

    @Transactional
    public void deleteEvent(Long userId, Long eventId) {
        Event event = getAccessibleEvent(userId, eventId);
        eventRepository.delete(event);
    }

    private Workspace resolveWorkspace(User user, Long workspaceId) {
        if (workspaceId == null) {
            return getOrCreatePersonalWorkspace(user);
        }

        Workspace workspace = workspaceRepository.findById(workspaceId)
                .orElseThrow(() -> new NotFoundException("Workspace not found"));

        if (!canAccess(user.getId(), workspace)) {
            throw new AccessDeniedException("You do not have access to this workspace");
        }

        return workspace;
    }

    private Event getAccessibleEvent(Long userId, Long eventId) {
        Event event = eventRepository.findById(eventId)
                .orElseThrow(() -> new NotFoundException("Event not found"));

        if (!canAccess(userId, event.getWorkspace())) {
            throw new AccessDeniedException("You do not have access to this event");
        }

        return event;
    }

    private boolean canAccess(Long userId, Workspace workspace) {
        return workspace.getOwner().getId().equals(userId)
               || memberRepository.existsByWorkspace_IdAndUser_Id(workspace.getId(), userId);
    }

    private Set<Long> accessibleWorkspaceIds(Long userId) {
        Set<Long> ids = new LinkedHashSet<>();

        workspaceRepository.findByOwner_Id(userId).forEach(workspace -> ids.add(workspace.getId()));
        memberRepository.findByUser_Id(userId).forEach(member -> ids.add(member.getWorkspace().getId()));

        return ids;
    }

    private User getUser(Long userId) {
        return userRepository.findById(userId)
                .orElseThrow(() -> new NotFoundException("User not found"));
    }

    private Workspace getOrCreatePersonalWorkspace(User user) {
        return workspaceRepository
                .findFirstByOwner_IdAndType(user.getId(), WorkspaceType.PERSONAL)
                .orElseGet(() -> workspaceRepository.save(
                        Workspace.builder()
                                .name("Personal")
                                .type(WorkspaceType.PERSONAL)
                                .color(PERSONAL_COLOR)
                                .owner(user)
                                .build()
                ));
    }

    private void validateEventTime(LocalDateTime startTime, LocalDateTime endTime) {
        if (!endTime.isAfter(startTime)) {
            throw new ConflictException("End time must be after start time");
        }
    }

    private EventResponse mapToResponse(Event event) {
        Workspace workspace = event.getWorkspace();

        return EventResponse.builder()
                .id(event.getId().toString())
                .title(event.getTitle())
                .description(event.getDescription())
                .startTime(event.getStartTime())
                .endTime(event.getEndTime())
                .workspaceId(workspace.getId().toString())
                .workspaceName(workspace.getName())
                .workspaceColor(workspace.getColor())
                .build();
    }
}