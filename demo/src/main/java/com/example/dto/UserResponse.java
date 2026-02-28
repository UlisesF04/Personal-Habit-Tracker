package com.example.dto;

import java.util.Set;
import com.example.security.Role;

public record UserResponse(
    Long id,
    String username,
    Set<Role> roles
){}
