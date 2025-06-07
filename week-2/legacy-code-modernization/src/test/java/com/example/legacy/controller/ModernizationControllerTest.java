package com.example.legacy.controller;

import com.example.legacy.model.ModernizationRequest;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import com.example.legacy.service.ModernizationService;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest(ModernizationController.class)
class ModernizationControllerTest {
    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private ModernizationService modernizationService;

    @Autowired
    private ObjectMapper objectMapper;

    @Test
    void analyzeLegacyCode_returnsOk() throws Exception {
        ModernizationRequest request = new ModernizationRequest();
        request.setLegacyCode("legacy code");
        when(modernizationService.analyzeLegacyCode(any())).thenReturn(new com.example.legacy.model.ModernizationResponse());
        mockMvc.perform(post("/api/modernization/analyze")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isOk());
    }

    @Test
    void modernizeLegacyCode_returnsOk() throws Exception {
        ModernizationRequest request = new ModernizationRequest();
        request.setLegacyCode("legacy code");
        when(modernizationService.modernizeLegacyCode(any())).thenReturn(new com.example.legacy.model.ModernizationResponse());
        mockMvc.perform(post("/api/modernization/modernize")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isOk());
    }
} 