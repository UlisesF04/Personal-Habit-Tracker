package com.example.repository;

import java.time.LocalDate;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import com.example.entity.Habit;
import com.example.entity.HabitLog;
import com.example.entity.User;

public interface HabitLogRepository extends JpaRepository<HabitLog, Long>{
    boolean existsByHabitAndDate(Habit habit, LocalDate date);
    List<HabitLog> findByHabitOrderByDateDesc(Habit habit);
    long countByHabitUserAndDate(User user, LocalDate date);
}
