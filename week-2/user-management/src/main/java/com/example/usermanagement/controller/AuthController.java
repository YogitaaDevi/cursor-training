package com.example.usermanagement.controller;

import com.example.usermanagement.model.User;
import com.example.usermanagement.repository.UserRepository;
import com.example.usermanagement.security.JwtUtil;
import com.example.usermanagement.security.CustomUserDetailsService;
import com.example.usermanagement.service.UserService;
import com.example.usermanagement.dto.UserResponseDTO;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {
    private final UserService userService;
    private final AuthenticationManager authenticationManager;
    private final JwtUtil jwtUtil;
    private final CustomUserDetailsService userDetailsService;

    @PostMapping("/register")
    public ResponseEntity<?> register(@Valid @RequestBody User user) {
        if (userService.usernameExists(user.getUsername())) {
            return ResponseEntity.badRequest().body(Map.of("error", "Username already exists"));
        }
        // User created = userService.registerUser(user);
        UserResponseDTO responseDTO = userService.registerUser(user);
        return ResponseEntity.status(201).body(Map.of(
            "message", "User registered successfully",
            "user", responseDTO
        ));
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> loginData) {
        try {
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            loginData.get("username"),
                            loginData.get("password")
                    )
            );
            UserDetails userDetails = userDetailsService.loadUserByUsername(loginData.get("username"));
            String token = jwtUtil.generateToken(userDetails.getUsername());
            return ResponseEntity.status(200).body(token);
        } catch (AuthenticationException e) {
            return ResponseEntity.status(401).body(Map.of("error", "Invalid username or password"));
        }
    }
} 