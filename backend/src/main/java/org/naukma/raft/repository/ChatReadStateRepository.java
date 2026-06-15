package org.naukma.raft.repository;

import org.naukma.raft.entity.ChatReadState;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ChatReadStateRepository extends JpaRepository<ChatReadState, Long> {

    Optional<ChatReadState> findByWorkspace_IdAndUser_Id(Long workspaceId, Long userId);

    void deleteByWorkspace_Id(Long workspaceId);

    void deleteByWorkspace_IdAndUser_Id(Long workspaceId, Long userId);
}