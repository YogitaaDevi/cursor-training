package com.example.designpattern.service;

import com.example.designpattern.model.Payment;
import org.springframework.stereotype.Component;

@Component
public class PayPalPaymentStrategy implements PaymentStrategy {
    @Override
    public String processPayment(Payment payment) {
        // Simulate PayPal processing logic
        return "Processed PayPal payment of $" + payment.getAmount();
    }
} 