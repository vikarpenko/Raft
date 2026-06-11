package org.naukma.raft.repository;

import org.naukma.raft.entity.Folder;
import org.naukma.raft.enums.FolderType;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Collection;
import java.util.List;
import java.util.Optional;

public interface FolderRepository extends JpaRepository<Folder, Long> {
    List<Folder> findByWorkspace_IdInOrderByCreatedDesc(Collection<Long> workspaceIds);

    List<Folder> findByWorkspace_IdOrderByCreatedDesc(Long workspaceId);

    List<Folder> findByWorkspace_IdAndTypeOrderByCreatedDesc(Long workspaceId, FolderType type);

    boolean existsByWorkspace_IdAndName(Long workspaceId, String name);

    Optional<Folder> findByIdAndWorkspace_Id(Long id, Long workspaceId);

    void deleteByWorkspace_Id(Long workspaceId);
}