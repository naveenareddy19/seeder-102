package com.bc102.seeder.paymentsservice.service;


import com.bc102.seeder.paymentsservice.dto.PaymentsDTO;
import com.bc102.seeder.paymentsservice.entity.Payments;
import com.bc102.seeder.paymentsservice.exceptions.CustomPersistenceException;
import com.bc102.seeder.paymentsservice.respository.PaymentsRepository;
import org.junit.Rule;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.mockito.junit.MockitoJUnit;

import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.ArgumentMatchers.any;
import org.mockito.junit.MockitoRule;

import java.util.Arrays;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;


class PaymentsServiceImplTest {
    @Rule
    public MockitoRule mockitoRule= MockitoJUnit.rule();

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Mock
    private PaymentsRepository paymentsRepository;

    @InjectMocks
    private PaymentsServiceImpl paymentsService;

    @Test
    void testSavePayment() {
        PaymentsDTO paymentsDTO = new PaymentsDTO(/* initialize with necessary data */);
        Payments paymentsEntity = PaymentsDTO.convertDtoToEntity(paymentsDTO);

        when(paymentsRepository.save(any(Payments.class))).thenReturn(paymentsEntity);

        PaymentsDTO savedPaymentsDTO = paymentsService.savePayment(paymentsDTO);

        verify(paymentsRepository, times(1)).save(any(Payments.class));
    }

    @Test
    void testGetPaymentsByUserId() {
        int userId = 123;
        Payments paymentsEntity = new Payments();
        List<Payments> paymentsList = List.of(paymentsEntity);

        when(paymentsRepository.findByUserId(userId)).thenReturn(paymentsList);

        List<PaymentsDTO> paymentsDTOList = paymentsService.getPaymentsByUserId(userId);

        assertEquals(1, paymentsDTOList.size());
        verify(paymentsRepository, times(1)).findByUserId(userId);
    }

    @Test
    void testSavePayments_PersistenceException() {
        PaymentsDTO cashKickDTO = new PaymentsDTO();
        when(paymentsRepository.save(any(Payments.class))).thenThrow(CustomPersistenceException.class);
        assertThrows(CustomPersistenceException.class, () -> paymentsService.savePayment(cashKickDTO));
    }
}