package com.example.designpattern.service;

import com.example.designpattern.model.Payment;
import org.springframework.stereotype.Component;

@Component
public class CreditCardPaymentStrategy implements PaymentStrategy {
    @Override
    public String processPayment(Payment payment) {
        // Simulate credit card processing logic
        return "Processed credit card payment of $" + payment.getAmount();
    }
} 