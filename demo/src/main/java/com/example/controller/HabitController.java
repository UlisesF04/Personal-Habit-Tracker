package com.example.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import com.example.dto.HabitRequest;
import com.example.dto.HabitResponse;
import com.example.entity.Habit;
import com.example.entity.User;
import com.example.exception.ResourceNotFoundException;
import com.example.mapper.HabitMapper;
import com.example.repository.HabitRepository;
import com.example.repository.UserRepository;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;

@SecurityRequirement(name = "bearerAuth")
@RestController
@RequestMapping("/habits")
@RequiredArgsConstructor
public class HabitController {
    private final UserRepository userRepository;
    private final HabitRepository habitRepository;

    @PostMapping
    public HabitResponse createHabit(
       @Valid @RequestBody HabitRequest request, 
        Authentication authentication
    ){
        User user = userRepository
                .findByUsername(authentication.getName())
                .orElseThrow(() -> new ResourceNotFoundException("We couldn't find this user!"));
        Habit habit = new Habit();
        habit.setName(request.getName());
        habit.setDescription(request.getDescription());
        habit.setUser(user);
        Habit saved = habitRepository.save(habit);
        return HabitMapper.toResponse(saved);
    }

    @GetMapping
    public Page<HabitResponse> getHabits(
        Authentication authentication,
        @RequestParam(defaultValue = "0")int page,
        @RequestParam(defaultValue = "5")int size
    ){
        User user = userRepository
                .findByUsername(authentication.getName())
                .orElseThrow(() -> new ResourceNotFoundException("We couldn't find this habit!"));
        Page<Habit> habits = habitRepository
                .findByUser(user, PageRequest.of(page, size));
        return habits.map(HabitMapper::toResponse);
    }

    @PutMapping("/{id}")
    public HabitResponse updateHabit(
        @PathVariable Long id,
        @RequestBody HabitRequest request,
        Authentication authentication
    ){
        User user = userRepository
            .findByUsername(authentication.getName())
            .orElseThrow(() -> new ResourceNotFoundException("We couldn't find a habit to update!"));
        Habit habit = habitRepository
            .findByIdAndUser(id, user)
            .orElseThrow(() -> new ResourceNotFoundException("We couldn't find a habit to update!"));
        habit.setName(request.getName());
        habit.setDescription(request.getDescription());
        habit.setFrequency(request.getFrequency());

        habitRepository.save(habit);
        return HabitMapper.toResponse(habit);
    }

    @DeleteMapping("/{id}")
    public void deleteHabit(
        @PathVariable Long id,
        Authentication authentication
    ){
        User user = userRepository
            .findByUsername(authentication.getName())
            .orElseThrow(() -> new ResourceNotFoundException("We couldn't find a habit to delete!"));
        Habit habit = habitRepository
            .findByIdAndUser(id, user)
            .orElseThrow(() -> new ResourceNotFoundException("We couldn't find a habit to delete!"));
        habitRepository.delete(habit);
    }
}
