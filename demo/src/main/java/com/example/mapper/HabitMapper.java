package com.example.mapper;

import com.example.dto.HabitResponse;
import com.example.entity.Habit;

public class HabitMapper {
    public static HabitResponse toResponse(Habit habit){
        return new HabitResponse(
            habit.getId(), 
            habit.getName(), 
            habit.getDescription(),
            habit.getFrequency()
        );
    }
}
