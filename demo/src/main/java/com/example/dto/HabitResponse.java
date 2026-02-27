package com.example.dto;

public class HabitResponse {
    private Long id;
    private String name;
    private String description;
    private String frequency;
    public HabitResponse(Long id, String name, String description, String frequency){
        this.id=id;
        this.name=name;
        this.description=description;
        this.frequency=frequency;
    }

    public Long getId(){
        return id;
    }
    public String getName(){
        return name;
    }
    public String getDescription(){
        return description;
    }
    public String getFrequency(){
        return frequency;
    }
}
