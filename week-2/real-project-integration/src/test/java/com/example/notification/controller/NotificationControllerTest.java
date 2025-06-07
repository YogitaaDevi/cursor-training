import com.example.notification.dto.UserResponse;
import com.example.notification.service.NotificationService;
import com.example.notification.controller.NotificationController;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import java.util.Collections;

import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

class NotificationControllerTest {
    private MockMvc mockMvc;

    @Mock
    private NotificationService notificationService;

    @InjectMocks
    private NotificationController notificationController;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
        mockMvc = MockMvcBuilders.standaloneSetup(notificationController).build();
    }

    @Test
    void testCreateNotification() throws Exception {
        UserResponse userResponse = new UserResponse(1L, 1L, "Test", false);
        when(notificationService.createNotification(eq(1L), eq("Test"))).thenReturn(userResponse);
        mockMvc.perform(post("/api/notifications")
                .param("userId", "1")
                .param("message", "Test"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(1L));
    }

    @Test
    void testGetNotificationsForUser() throws Exception {
        UserResponse userResponse = new UserResponse(1L, 1L, "Test", false);
        when(notificationService.getNotificationsForUser(1L)).thenReturn(Collections.singletonList(userResponse));
        mockMvc.perform(get("/api/notifications/user/1"))
                .andExpect(status().isOk());
    }

    @Test
    void testMarkAsRead() throws Exception {
        UserResponse userResponse = new UserResponse(1L, 1L, "Test", true);
        when(notificationService.markAsRead(1L)).thenReturn(userResponse);
        mockMvc.perform(post("/api/notifications/1/read"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.read").value(true));
    }
}