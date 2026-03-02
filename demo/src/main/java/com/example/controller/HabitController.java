package com.example.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.dto.DashboardResponse;
import com.example.dto.HabitRequest;
import com.example.dto.HabitResponse;
import com.example.dto.HabitStatsResponse;
import com.example.entity.Habit;
import com.example.entity.HabitLog;
import com.example.entity.User;
import com.example.exception.ResourceNotFoundException;
import com.example.mapper.HabitMapper;
import com.example.repository.HabitLogRepository;
import com.example.repository.HabitRepository;
import com.example.repository.UserRepository;
import com.example.service.HabitService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;

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
    private final HabitLogRepository habitLogRepository;
    private final HabitService habitService;

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

    @PostMapping("/{id}/complete")
    public Map <String, Object>completeHabit(
        @PathVariable Long id, 
        Authentication authentication
    ) {
        User user = userRepository
            .findByUsername(authentication.getName())
            .orElseThrow(() ->new ResourceNotFoundException("User not found!"));
        
        Habit habit = habitRepository
            .findByIdAndUser(id, user)
            .orElseThrow(()-> new ResourceNotFoundException("Habit not found for this user!"));
        
        LocalDate today= LocalDate.now();

        if(habitLogRepository.existsByHabitAndDate(habit, today)){
            throw new IllegalStateException("Habit already completed today");
        }
        HabitLog log = new HabitLog();
        log.setHabit(habit);
        log.setDate(today);
        habitLogRepository.save(log);

        List<HabitLog> logs =
            habitLogRepository.findByHabitOrderByDateDesc(habit);
        
        int currentStreak = habitService.calculateCurrentStreak(logs);
        int bestStreak = habitService.calculateBestStreak(logs);
        String motivation=habitService.motivationMessage(currentStreak);

        return Map.of(
            "message", motivation,
            "currentStreak", currentStreak,
            "bestStreak",bestStreak,
            "date", today
        );
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

    @GetMapping("/{id}/stats")
    public HabitStatsResponse getHabitStats(
        @PathVariable Long id, 
        Authentication authentication
    ){
        return habitService.getHabitStats(id, authentication.getName());
    }
    
    @GetMapping("/dashboard")
    public DashboardResponse getDashboard(Authentication authentication) {
        return habitService.getDashboard(authentication.getName());
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
