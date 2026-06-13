package org.naukma.raft.service;

import lombok.RequiredArgsConstructor;
import org.naukma.raft.dto.response.AchievementResponse;
import org.naukma.raft.entity.Achievement;
import org.naukma.raft.entity.UserAchievement;
import org.naukma.raft.repository.AchievementRepository;
import org.naukma.raft.repository.UserAchievementRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class AchievementService {

    private final AchievementRepository achievementRepository;
    private final UserAchievementRepository userAchievementRepository;

    @Transactional(readOnly = true)
    public List<AchievementResponse> getAchievements(Long userId) {
        List<UserAchievement> earnedAchievements =
                userAchievementRepository.findByUser_IdOrderByEarnedAtDesc(userId);

        return achievementRepository.findAll()
                .stream()
                .map(achievement -> mapToResponse(achievement, earnedAchievements))
                .toList();
    }

    @Transactional(readOnly = true)
    public List<AchievementResponse> getEarnedAchievements(Long userId) {
        return userAchievementRepository.findByUser_IdOrderByEarnedAtDesc(userId)
                .stream()
                .map(userAchievement -> mapToResponse(
                        userAchievement.getAchievement(),
                        List.of(userAchievement)
                ))
                .toList();
    }

    private AchievementResponse mapToResponse(
            Achievement achievement,
            List<UserAchievement> earnedAchievements
    ) {
        UserAchievement earnedAchievement = earnedAchievements.stream()
                .filter(userAchievement -> userAchievement.getAchievement().getCode().equals(achievement.getCode()))
                .findFirst()
                .orElse(null);

        return AchievementResponse.builder()
                .id(achievement.getId().toString())
                .code(achievement.getCode())
                .title(achievement.getTitle())
                .description(achievement.getDescription())
                .icon(achievement.getIcon())
                .earned(earnedAchievement != null)
                .earnedAt(earnedAchievement == null ? null : earnedAchievement.getEarnedAt())
                .build();
    }
}