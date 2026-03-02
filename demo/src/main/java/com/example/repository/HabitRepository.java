package com.example.repository;

import java.util.List;
import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import com.example.entity.Habit;
import com.example.entity.User;

public interface HabitRepository  extends JpaRepository<Habit, Long>{
    Page<Habit> findByUser(User user, Pageable pageable);
    List <Habit> findAllByUser(User user);
    Optional<Habit> findByIdAndUser(Long id, User user);
}