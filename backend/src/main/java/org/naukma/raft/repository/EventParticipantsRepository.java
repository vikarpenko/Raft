package org.naukma.raft.repository;

import org.naukma.raft.entity.EventParticipants;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EventParticipantsRepository extends JpaRepository<EventParticipants, Long> {
}
