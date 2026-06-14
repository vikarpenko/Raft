package org.naukma.raft.config;

import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import org.naukma.raft.entity.Achievement;
import org.naukma.raft.repository.AchievementRepository;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class AchievementSeeder {
    private final AchievementRepository achievementRepository;

    @PostConstruct
    public void seed() {
        seedIfMissing("TASKS_10", "10 завдань виконано", "Виконайте 10 завдань", "tasks-10.svg");
        seedIfMissing("TASKS_50", "50 завдань виконано", "Виконайте 50 завдань", "tasks-50.svg");
        /*seedIfMissing("PLANNING_7_DAYS", "Тижневий планувальник", "Плануйте 7 днів підряд", "streak-7.svg");
        seedIfMissing("PLANNING_30_DAYS", "Місячний планувальник", "Плануйте 30 днів підряд", "streak-30.svg");*/
        seedIfMissing("EXPENSES_15", "15 витрат", "Створіть 15 спільних витрат", "expenses-15.svg");
        seedIfMissing("WORKSPACE_CREATED", "Перший простір", "Створіть свій перший спільний простір", "workspace-1.svg");
        seedIfMissing("NOTES_5", "Нотатник", "Створіть 5 нотаток", "notes-5.svg");
        //seedIfMissing("EARLY_BIRD", "Рання пташка", "Виконайте задачу до 9:00", "early-bird.svg");
        seedIfMissing("ALL_SETTLED", "Чиста совість", "Розрахуйтесь по всіх боргах", "settled.svg");
        seedIfMissing("FIRST_WEEK", "Перший тиждень", "Користуйтесь Raft 7 днів", "week-1.svg");
    }

    private void seedIfMissing(String code, String title, String description, String icon) {
        if (achievementRepository.findByCode(code).isEmpty()) {
            achievementRepository.save(Achievement.builder()
                    .code(code)
                    .title(title)
                    .description(description)
                    .icon(icon)
            .build());
        }
    }
}
