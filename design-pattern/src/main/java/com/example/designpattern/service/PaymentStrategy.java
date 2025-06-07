package com.example.designpattern.service;

import com.example.designpattern.model.Payment;

public interface PaymentStrategy {
    String processPayment(Payment payment);
} 