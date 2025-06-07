package com.example.designpattern.service;

import com.example.designpattern.model.Payment;
import org.springframework.stereotype.Component;

@Component
public class BankTransferPaymentStrategy implements PaymentStrategy {
    @Override
    public String processPayment(Payment payment) {
        // Simulate bank transfer processing logic
        return "Processed bank transfer payment of $" + payment.getAmount();
    }
} 