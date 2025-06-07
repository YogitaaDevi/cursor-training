package com.example.legacy.service;

import com.example.legacy.model.ModernizationRequest;
import com.example.legacy.model.ModernizationResponse;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

class ModernizationServiceTest {
    private final ModernizationService service = new ModernizationService();

    @Test
    void analyzeLegacyCode_returnsExpectedResult() {
        ModernizationRequest request = new ModernizationRequest();
        request.setLegacyCode("legacy code");
        ModernizationResponse response = service.analyzeLegacyCode(request);
        assertNotNull(response);
        assertTrue(response.getResult().contains("Analysis result for: legacy code"));
    }

    @Test
    void modernizeLegacyCode_returnsExpectedResult() {
        ModernizationRequest request = new ModernizationRequest();
        request.setLegacyCode("legacy code");
        ModernizationResponse response = service.modernizeLegacyCode(request);
        assertNotNull(response);
        assertTrue(response.getResult().contains("Modernized code for: legacy code"));
    }
} 