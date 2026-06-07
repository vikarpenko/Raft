package org.naukma.raft.service;

import lombok.RequiredArgsConstructor;
import org.naukma.raft.dto.request.TaskPatchRequest;
import org.naukma.raft.dto.request.TaskRequest;
import org.naukma.raft.dto.response.TaskResponse;
import org.naukma.raft.entity.Task;
import org.naukma.raft.entity.User;
import org.naukma.raft.entity.Workspace;
import org.naukma.raft.enums.WorkspaceColor;
import org.naukma.raft.enums.WorkspaceType;
import org.naukma.raft.errorsHadling.AccessDeniedException;
import org.naukma.raft.errorsHadling.NotFoundException;
import org.naukma.raft.repository.TaskRepository;
import org.naukma.raft.repository.UserRepository;
import org.naukma.raft.repository.WorkspaceMemberRepository;
import org.naukma.raft.repository.WorkspaceRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.LinkedHashSet;
import java.util.List;
import java.util.Set;

@Service
@RequiredArgsConstructor
public class TaskService {
    private static final WorkspaceColor PERSONAL_COLOR = WorkspaceColor.GRAY;

    private final TaskRepository taskRepository;
    private final UserRepository userRepository;
    private final WorkspaceRepository workspaceRepository;
    private final WorkspaceMemberRepository memberRepository;

    @Transactional(readOnly = true)
    public List<TaskResponse> getTasks(Long userId) {
        Set<Long> workspaceIds = accessibleWorkspaceIds(userId);
        if (workspaceIds.isEmpty()) {
            return List.of();
        }
        return taskRepository.findByWorkspace_IdInOrderByCreatedDesc(workspaceIds)
                .stream()
                .map(this::mapToResponse)
                .toList();
    }

    @Transactional
    public TaskResponse createTask(Long userId, TaskRequest request) {
        User user = getUser(userId);
        Workspace workspace = resolveWorkspace(user, request.getWorkspaceId());

        Task task = Task.builder()
                .creator(user)
                .workspace(workspace)
                .title(request.getTitle())
                .description(request.getDescription())
                .priority(request.getPriority())
                .status(request.getStatus())
                .dueDate(request.getDueDate())
                .dueTime(request.getDueTime())
                .build();

        return mapToResponse(taskRepository.save(task));
    }

    @Transactional
    public TaskResponse updateTask(Long userId, Long taskId, TaskPatchRequest request) {
        Task task = getAccessibleTask(userId, taskId);

        if (request.getTitle() != null) task.setTitle(request.getTitle());
        if (request.getDescription() != null) task.setDescription(request.getDescription());
        if (request.getPriority() != null) task.setPriority(request.getPriority());
        if (request.getStatus() != null) task.setStatus(request.getStatus());
        if (request.getDueDate() != null) task.setDueDate(request.getDueDate());
        if (request.getDueTime() != null) task.setDueTime(request.getDueTime());

        return mapToResponse(taskRepository.save(task));
    }

    @Transactional
    public void deleteTask(Long userId, Long taskId) {
        Task task = getAccessibleTask(userId, taskId);
        taskRepository.delete(task);
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

    private Task getAccessibleTask(Long userId, Long taskId) {
        Task task = taskRepository.findById(taskId)
                .orElseThrow(() -> new NotFoundException("Task not found"));
        if (!canAccess(userId, task.getWorkspace())) {
            throw new AccessDeniedException("You do not have access to this task");
        }
        return task;
    }

    private boolean canAccess(Long userId, Workspace workspace) {
        return workspace.getOwner().getId().equals(userId)
                || memberRepository.existsByWorkspace_IdAndUser_Id(workspace.getId(), userId);
    }

    private Set<Long> accessibleWorkspaceIds(Long userId) {
        Set<Long> ids = new LinkedHashSet<>();
        workspaceRepository.findByOwner_Id(userId).forEach(w -> ids.add(w.getId()));
        memberRepository.findByUser_Id(userId).forEach(m -> ids.add(m.getWorkspace().getId()));
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

    private TaskResponse mapToResponse(Task task) {
        Workspace workspace = task.getWorkspace();
        return TaskResponse.builder()
                .id(task.getId().toString())
                .title(task.getTitle())
                .description(task.getDescription())
                .priority(task.getPriority())
                .dueDate(task.getDueDate())
                .dueTime(task.getDueTime())
                .status(task.getStatus())
                .workspaceId(workspace.getId().toString())
                .workspaceName(workspace.getName())
                .workspaceColor(workspace.getColor())
                .build();
    }
}
