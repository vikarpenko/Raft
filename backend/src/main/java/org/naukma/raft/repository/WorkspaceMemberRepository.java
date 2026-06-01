package org.naukma.raft.repository;

import org.naukma.raft.entity.WorkspaceMember;
import org.springframework.data.jpa.repository.JpaRepository;

public interface WorkspaceMemberRepository extends JpaRepository<WorkspaceMember, Long> {
}
