package com.example.dto;

public record HabitStatsResponse(
    int currentStreak,
    int bestStreak,
    long totalCompletions,
    double completionRateLast7Days,
    double completionRateLast30Days
) { }
