package org.naukma.raft.repository;

import org.naukma.raft.entity.Note;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface NoteRepository extends JpaRepository<Note, Long> {
    List<Note> findByFolder_Id(Long folderId);

    void deleteByFolder_Id(Long workspaceId);
}