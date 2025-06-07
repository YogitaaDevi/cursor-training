package com.example.notification.service;

import com.example.notification.model.Notification;
import com.example.notification.repository.NotificationRepository;
import com.example.notification.dto.UserResponse;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class NotificationService {
    private final NotificationRepository notificationRepository;
    private static final Logger logger = LoggerFactory.getLogger(NotificationService.class);

    public UserResponse createNotification(Long userId, String message) {
        if (userId == null || !StringUtils.hasText(message)) {
            logger.error("Invalid input: userId or message is null/empty");
            throw new IllegalArgumentException("UserId and message must be provided");
        }
        Notification notification = Notification.builder()
                .userId(userId)
                .message(message)
                .isRead(false)
                .createdAt(LocalDateTime.now())
                .build();
        Notification saved = notificationRepository.save(notification);
        logger.info("Notification created for user {}: {}", userId, message);
        return toUserResponse(saved);
    }

    public List<UserResponse> getNotificationsForUser(Long userId) {
        if (userId == null) {
            logger.error("UserId is null");
            throw new IllegalArgumentException("UserId must be provided");
        }
        return notificationRepository.findByUserIdOrderByCreatedAtDesc(userId)
                .stream()
                .map(this::toUserResponse)
                .collect(Collectors.toList());
    }

    public UserResponse markAsRead(Long notificationId) {
        Optional<Notification> opt = notificationRepository.findById(notificationId);
        if (opt.isEmpty()) {
            logger.error("Notification {} not found", notificationId);
            throw new IllegalArgumentException("Notification not found");
        }
        Notification notification = opt.get();
        notification.setRead(true);
        Notification updated = notificationRepository.save(notification);
        logger.info("Notification {} marked as read", notificationId);
        return toUserResponse(updated);
    }

    private UserResponse toUserResponse(Notification notification) {
        return new UserResponse(
                notification.getId(),
                notification.getUserId(),
                notification.getMessage(),
                notification.isRead()
        );
    }
}