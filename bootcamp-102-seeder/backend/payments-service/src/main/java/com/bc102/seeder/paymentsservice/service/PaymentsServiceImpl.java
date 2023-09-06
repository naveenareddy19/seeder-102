package com.bc102.seeder.paymentsservice.service;

import com.bc102.seeder.paymentsservice.dto.PaymentsDTO;
import com.bc102.seeder.paymentsservice.entity.Payments;
import com.bc102.seeder.paymentsservice.exceptions.CustomPersistenceException;
import com.bc102.seeder.paymentsservice.respository.PaymentsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PaymentsServiceImpl implements PaymentsService{

    @Autowired
    PaymentsRepository paymentsRepository;

    @Override
    public PaymentsDTO savePayment(PaymentsDTO paymentsDTO) {
        Payments payment = PaymentsDTO.convertDtoToEntity(paymentsDTO);
        try{
            return PaymentsDTO.convertEntityToDto(paymentsRepository.save(payment));
        }
        catch (CustomPersistenceException ex){
            throw new CustomPersistenceException(ex.getMessage());
        }
    }

    @Override
    public List<PaymentsDTO> getPaymentsByUserId(int userId) {
        List<Payments> payments = paymentsRepository.findByUserId(userId);
        return payments.stream().map(PaymentsDTO::convertEntityToDto).toList();
    }
}
