package com.example.designpattern.service;

import com.example.designpattern.model.Payment;
import com.example.designpattern.model.PaymentType;
import com.example.designpattern.repository.PaymentRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class PaymentService {
    private final CreditCardPaymentStrategy creditCardPaymentStrategy;
    private final PayPalPaymentStrategy payPalPaymentStrategy;
    private final BankTransferPaymentStrategy bankTransferPaymentStrategy;
    private final PaymentRepository paymentRepository;

    public String processPayment(Payment payment) {
        if (payment == null || payment.getAmount() <= 0 || payment.getPaymentType() == null) {
            throw new IllegalArgumentException("Invalid payment details");
        }
        String result;
        switch (payment.getPaymentType()) {
            case CREDIT_CARD:
                result = creditCardPaymentStrategy.processPayment(payment);
                break;
            case PAYPAL:
                result = payPalPaymentStrategy.processPayment(payment);
                break;
            case BANK_TRANSFER:
                result = bankTransferPaymentStrategy.processPayment(payment);
                break;
            default:
                throw new IllegalArgumentException("Unsupported payment type");
        }
        try {
            payment.setStatus("COMPLETED");
            paymentRepository.save(payment);
        } catch (Exception e) {
            // Log and rethrow or wrap in a custom exception
            throw new RuntimeException("Failed to save payment", e);
        }
        return result;
    }
} 