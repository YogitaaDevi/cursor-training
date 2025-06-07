package com.example.notification.service;

import com.example.notification.model.Notification;
import com.example.notification.repository.NotificationRepository;
import com.example.notification.dto.UserResponse;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.util.Collections;
import java.util.Optional;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

class NotificationServiceTest {
    @Mock
    private NotificationRepository notificationRepository;

    @InjectMocks
    private NotificationService notificationService;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void testCreateNotification() {
        Notification notification = Notification.builder().id(1L).userId(1L).message("Test").isRead(false).build();
        when(notificationRepository.save(any(Notification.class))).thenReturn(notification);
        UserResponse result = notificationService.createNotification(1L, "Test");
        assertEquals("Test", result.getMessage());
        assertEquals(1L, result.getUserId());
        assertFalse(result.isRead());
    }

    @Test
    void testGetNotificationsForUser() {
        Notification notification = Notification.builder().id(1L).userId(1L).message("Test").isRead(false).build();
        when(notificationRepository.findByUserIdOrderByCreatedAtDesc(1L)).thenReturn(Collections.singletonList(notification));
        List<UserResponse> responses = notificationService.getNotificationsForUser(1L);
        assertEquals(1, responses.size());
        assertEquals("Test", responses.get(0).getMessage());
    }

    @Test
    void testMarkAsRead() {
        Notification notification = Notification.builder().id(1L).userId(1L).message("Test").isRead(false).build();
        Notification readNotification = Notification.builder().id(1L).userId(1L).message("Test").isRead(true).build();
        when(notificationRepository.findById(1L)).thenReturn(Optional.of(notification));
        when(notificationRepository.save(any(Notification.class))).thenReturn(readNotification);
        UserResponse result = notificationService.markAsRead(1L);
        assertTrue(result.isRead());
    }

    @Test
    void testCreateNotificationInvalidInput() {
        assertThrows(IllegalArgumentException.class, () -> notificationService.createNotification(null, ""));
    }
} 