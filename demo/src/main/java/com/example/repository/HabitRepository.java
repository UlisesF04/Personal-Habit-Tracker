package com.example.repository;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import com.example.entity.Habit;
import com.example.entity.User;

public interface HabitRepository  extends JpaRepository<Habit, Long>{
    List<Habit> findByUser(User user);
}