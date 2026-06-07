package org.naukma.raft.repository;

import org.naukma.raft.entity.WorkspaceMember;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface WorkspaceMemberRepository extends JpaRepository<WorkspaceMember, Long> {
    List<WorkspaceMember> findByUser_Id(Long userId);

    List<WorkspaceMember> findByWorkspace_Id(Long workspaceId);

    Optional<WorkspaceMember> findByWorkspace_IdAndUser_Id(Long workspaceId, Long userId);

    boolean existsByWorkspace_IdAndUser_Id(Long workspaceId, Long userId);
}
