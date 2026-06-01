package org.naukma.raft.repository;

import org.naukma.raft.entity.ExpenseMember;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ExpenseMemberRepository extends JpaRepository<ExpenseMember, Long> {
}
