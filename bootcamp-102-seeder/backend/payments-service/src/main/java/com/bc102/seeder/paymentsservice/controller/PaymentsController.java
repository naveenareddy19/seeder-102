package com.bc102.seeder.paymentsservice.controller;

import com.bc102.seeder.paymentsservice.dto.PaymentsDTO;
import com.bc102.seeder.paymentsservice.service.PaymentsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/payments")
public class PaymentsController {

    @Autowired
    PaymentsService paymentsService;

    @PostMapping("")
    public PaymentsDTO addPayment(@RequestBody PaymentsDTO paymentsDTO){
        return paymentsService.savePayment(paymentsDTO);
    }

    @GetMapping("")
    public List<PaymentsDTO> getPaymentsByUserId(@RequestParam int userId){
        return paymentsService.getPaymentsByUserId(userId);
    }
}
