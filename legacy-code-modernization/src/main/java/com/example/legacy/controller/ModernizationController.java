package com.example.legacy.controller;

import com.example.legacy.model.ModernizationRequest;
import com.example.legacy.model.ModernizationResponse;
import com.example.legacy.service.ModernizationService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/modernization")
@RequiredArgsConstructor
public class ModernizationController {
    private final ModernizationService modernizationService;

    @PostMapping("/analyze")
    public ResponseEntity<ModernizationResponse> analyzeLegacyCode(@RequestBody ModernizationRequest request) {
        ModernizationResponse response = modernizationService.analyzeLegacyCode(request);
        return ResponseEntity.ok(response);
    }

    @PostMapping("/modernize")
    public ResponseEntity<ModernizationResponse> modernizeLegacyCode(@RequestBody ModernizationRequest request) {
        ModernizationResponse response = modernizationService.modernizeLegacyCode(request);
        return ResponseEntity.ok(response);
    }
} 