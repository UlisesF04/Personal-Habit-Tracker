package com.example.dto;

public record DashboardResponse(
        int totalHabits,
        long completedToday,
        int longestStreakOverall,
        double averageConsistencyLast7Days
) { }
