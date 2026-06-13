 package org.naukma.raft.repository;

import org.naukma.raft.entity.Reminder;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface ReminderRepository extends JpaRepository<Reminder, Long> {
    List<Reminder> findByUser_IdOrderByReminderTimeAsc(Long userId);

    Optional<Reminder> findByIdAndUser_Id(Long id, Long userId);
}
