package org.naukma.raft.repository;

import org.naukma.raft.entity.UserAchievement;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserAchievementRepository extends JpaRepository<UserAchievement, Long> {
}
