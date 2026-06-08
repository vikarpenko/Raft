package org.naukma.raft.repository;

import org.naukma.raft.entity.Task;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Collection;
import java.util.List;

public interface TaskRepository extends JpaRepository<Task, Long> {
    List<Task> findByWorkspace_IdInOrderByCreatedDesc(Collection<Long> workspaceIds);

    void deleteByWorkspace_Id(Long workspaceId);
}
