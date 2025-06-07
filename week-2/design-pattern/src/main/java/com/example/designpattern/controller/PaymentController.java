package com.example.designpattern.controller;

import com.example.designpattern.model.Payment;
import com.example.designpattern.service.PaymentService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/payments")
@RequiredArgsConstructor
public class PaymentController {
    private final PaymentService paymentService;

    @PostMapping
    public ResponseEntity<String> processPayment(@RequestBody Payment payment) {
        String result = paymentService.processPayment(payment);
        return ResponseEntity.ok(result);
    }
} 