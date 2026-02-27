package com.example.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.dto.HabitRequest;
import com.example.dto.HabitResponse;
import com.example.entity.Habit;
import com.example.entity.User;
import com.example.mapper.HabitMapper;
import com.example.repository.HabitRepository;
import com.example.repository.UserRepository;
import com.example.service.HabitService;

import lombok.RequiredArgsConstructor;

import java.util.List;

import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;


@RestController
@RequestMapping("/habits")
@RequiredArgsConstructor
public class HabitController {
    private final HabitService habitService;
    private final UserRepository userRepository;
    private final HabitRepository habitRepository;

    @PostMapping
    public HabitResponse createHabit(@RequestBody HabitRequest request, Authentication authentication) {
        User user = userRepository
                .findByUsername(authentication.getName())
                .orElseThrow();
        Habit habit = new Habit();
        habit.setName(request.getName());
        habit.setDescription(request.getDescription());
        habit.setUser(user);
        Habit saved = habitRepository.save(habit);
        return HabitMapper.toResponse(saved);
    }

    @GetMapping
    public List<HabitResponse> getHabits(Authentication authentication) {
        User user = userRepository
                .findByUsername(authentication.getName())
                .orElseThrow();
        return habitRepository.findByUser(user)
                .stream()
                .map(HabitMapper::toResponse)
                .toList();
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id){
        habitService.delete(id);
    }
}
