package com.example.service;

import java.time.LocalDate;
import java.util.List;

import org.springframework.stereotype.Service;

import com.example.dto.DashboardResponse;
import com.example.dto.HabitStatsResponse;
import com.example.entity.Habit;
import com.example.entity.HabitLog;
import com.example.entity.User;
import com.example.repository.HabitLogRepository;
import com.example.repository.HabitRepository;
import com.example.repository.UserRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor

public class HabitService {
    private final HabitRepository habitRepository;
    private final UserRepository userRepository;
    private final HabitLogRepository habitLogRepository;

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

    public int calculateCurrentStreak(List<HabitLog> logs){
        if(logs.isEmpty())return 0;
        int streak=0;
        LocalDate today = LocalDate.now();
        LocalDate expectedDate = today;
        for (HabitLog log : logs){
            if (log.getDate().isEqual(expectedDate)){
                streak++;
                expectedDate = expectedDate.minusDays(1);
            } else{
                break;
            }
        }
        return streak;
    }

    public int calculateBestStreak(List<HabitLog> logs){
        if(logs.isEmpty())return 0;

        int best=1;
        int current=1;

        for(int i=1; i<logs.size();i++){
            LocalDate previous =logs.get(i -1).getDate();
            LocalDate currentDate = logs.get(i).getDate();

            if(previous.minusDays(1).isEqual(currentDate)){
                current++;
                best=Math.max(best, current);
            } else {
                current=1;
            }
        }
        return best;
    }

    public String motivationMessage(int streak){
        
        if(streak==1) return "This might be the beginning of something good! Continue like that!!";
        if(streak==7)return"First week completed! Congratulations!";
        if(streak==30) return"30 days in a row! You got some discipline!";

        return"Streak of "+streak+" days!";
    }

    private double calculateCompletionRate(List <HabitLog>logs, int days){
        LocalDate today = LocalDate.now();
        LocalDate startDate = today.minusDays(days-1);

        long count = logs.stream()
            .filter(log-> !log.getDate().isBefore(startDate))
            .count();

        return (count * 100.0)/days;
    }

    public HabitStatsResponse getHabitStats(Long habitId, String username){
        User user = userRepository.findByUsername(username)
            .orElseThrow();
        
        Habit habit = habitRepository
            .findByIdAndUser(habitId, user)
            .orElseThrow();

        List<HabitLog> logs = habitLogRepository.findByHabitOrderByDateDesc(habit);

        int currentStreak=calculateCurrentStreak(logs);
        int bestStreak = calculateBestStreak(logs);
        long totalCompletions = logs.size();
        double rate7 = calculateCompletionRate(logs, 7);
        double rate30 = calculateCompletionRate(logs, 30);

        return new HabitStatsResponse(
            currentStreak,
            bestStreak,
            totalCompletions,
            rate7,
            rate30
        );
    }

    public DashboardResponse getDashboard(String username){
        User user =userRepository.findByUsername(username)
            .orElseThrow();
        List<Habit> habits = habitRepository.findAllByUser(user);
        int totalHabits = habits.size();
        LocalDate today = LocalDate.now();
        long completedToday = habitLogRepository
            .countByHabitUserAndDate(user, today);
        int longestStreakOverall = 0;
        double totalConsistency = 0;

        for (Habit habit : habits){
            List<HabitLog> logs = 
                habitLogRepository.findByHabitOrderByDateDesc(habit);
            longestStreakOverall = Math.max(longestStreakOverall, calculateBestStreak(logs));
            totalConsistency+=calculateCompletionRate(logs, 7);
        }
        double averageConsistency= habits.isEmpty()?0:totalConsistency/habits.size();
        return new DashboardResponse(
            totalHabits,
            completedToday,
            longestStreakOverall,
            averageConsistency
        );
    }
}
