package org.naukma.raft.repository;

import org.naukma.raft.entity.ChatMessage;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

import java.time.LocalDateTime;

public interface ChatMessageRepository extends JpaRepository<ChatMessage, Long> {

    @EntityGraph(attributePaths = {"workspace", "sender"})
    List<ChatMessage> findByWorkspace_IdOrderByCreatedAtDesc(Long workspaceId, Pageable pageable);

    @EntityGraph(attributePaths = {"workspace", "sender"})
    Optional<ChatMessage> findTopByWorkspace_IdOrderByCreatedAtDesc(Long workspaceId);

    @EntityGraph(attributePaths = {"workspace", "sender"})
    @Query("select m from ChatMessage m where m.id = :id")
    Optional<ChatMessage> findDetailedById(@Param("id") Long id);

    void deleteByWorkspace_Id(Long workspaceId);

    long countByWorkspace_IdAndSender_IdNot(Long workspaceId, Long senderId);

    long countByWorkspace_IdAndCreatedAtAfterAndSender_IdNot(
            Long workspaceId,
            LocalDateTime createdAt,
            Long senderId
    );
}