package com.example.service;

import java.time.LocalDate;
import java.util.List;

import org.springframework.stereotype.Service;

import com.example.entity.Habit;
import com.example.repository.HabitRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor

public class HabitService {
    private final HabitRepository habitRepository;
    public Habit create(Habit habit){
        habit.setCreatedAt(LocalDate.now());
        return habitRepository.save(habit);
    }
    public List<Habit> getAll(){
        return habitRepository.findAll();
    }
    public void delete (Long id){
        habitRepository.deleteById(id);
    }
}
