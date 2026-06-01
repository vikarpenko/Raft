package org.naukma.raft.repository;

import org.naukma.raft.entity.Reminder;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ReminderRepository extends JpaRepository<Reminder, Long> {
}
