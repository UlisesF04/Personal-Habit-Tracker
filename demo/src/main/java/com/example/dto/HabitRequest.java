package com.example.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public class HabitRequest {

    @NotBlank(message = "A name for the habit is required")
    @Size(max = 50)
    private String name;
    
    @Size(max = 200)
    private String description;
    
    @NotBlank (message="A habit frequency is required")
    @Size(max = 40)
    private String frequency;

    public String getName(){
        return name;
    }
    public void setName(String name){
        this.name = name;
    }
    public String getDescription(){
        return description;
    }

    public void setDescription(String description){
        this.description=description;
    }
    public String getFrequency(){
        return frequency;
    }
    public void setFrequency(String frequency){
        this.frequency=frequency;
    }
}
