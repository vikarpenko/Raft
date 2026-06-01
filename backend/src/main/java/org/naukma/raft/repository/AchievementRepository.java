package org.naukma.raft.repository;

import org.naukma.raft.entity.Achievement;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AchievementRepository extends JpaRepository<Achievement, Long> {
}
