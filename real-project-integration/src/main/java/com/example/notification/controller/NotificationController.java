package com.example.notification.controller;

import com.example.notification.dto.UserResponse;
import com.example.notification.service.NotificationService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/notifications")
@RequiredArgsConstructor
public class NotificationController {
    private final NotificationService notificationService;

    @PostMapping
    public ResponseEntity<UserResponse> createNotification(@RequestParam Long userId, @RequestParam String message) {
        try {
            UserResponse notification = notificationService.createNotification(userId, message);
            return ResponseEntity.ok(notification);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<UserResponse>> getNotificationsForUser(@PathVariable Long userId) {
        try {
            List<UserResponse> notifications = notificationService.getNotificationsForUser(userId);
            return ResponseEntity.ok(notifications);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @PostMapping("/{id}/read")
    public ResponseEntity<UserResponse> markAsRead(@PathVariable Long id) {
        try {
            UserResponse notification = notificationService.markAsRead(id);
            return ResponseEntity.ok(notification);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.notFound().build();
        }
    }
} 