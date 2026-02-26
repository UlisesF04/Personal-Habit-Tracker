package com.example.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.entity.Habit;
import com.example.service.HabitService;

import lombok.RequiredArgsConstructor;

import java.util.List;

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

    @PostMapping
    public Habit create(@RequestBody Habit habit) {
        return habitService.create(habit);
    }
    @GetMapping
    public List <Habit> getAll(){
        return habitService.getAll();
    }
    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id){
        habitService.delete(id);
    }
}
