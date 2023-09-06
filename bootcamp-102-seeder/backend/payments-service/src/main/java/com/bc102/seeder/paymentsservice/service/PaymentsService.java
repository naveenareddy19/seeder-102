package com.bc102.seeder.paymentsservice.service;

import com.bc102.seeder.paymentsservice.dto.PaymentsDTO;

import java.util.List;

public interface PaymentsService {
    public PaymentsDTO savePayment(PaymentsDTO paymentsDTO);
    public List<PaymentsDTO> getPaymentsByUserId(int userId);
}
