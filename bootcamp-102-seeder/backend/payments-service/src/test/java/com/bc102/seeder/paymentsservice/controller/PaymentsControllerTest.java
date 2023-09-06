package com.bc102.seeder.paymentsservice.controller;

import com.bc102.seeder.paymentsservice.dto.PaymentsDTO;
import com.bc102.seeder.paymentsservice.service.PaymentsService;
import org.junit.Rule;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.mockito.junit.MockitoJUnit;
import org.mockito.junit.MockitoRule;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;


import java.time.LocalDate;
import java.util.Arrays;
import java.util.List;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyInt;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

class PaymentsControllerTest {
    private MockMvc mockMvc;

    @Rule
    public MockitoRule mockitoRule= MockitoJUnit.rule();

    @Mock
    private PaymentsService paymentsService;

    @InjectMocks
    private PaymentsController paymentsController;


    @BeforeEach
    public void setUp() {
        MockitoAnnotations.openMocks(this);
        mockMvc = MockMvcBuilders.standaloneSetup(paymentsController).build();
    }

    @Test
    void testAddPayment() throws Exception {
        PaymentsDTO paymentsDTO = new PaymentsDTO();
        paymentsDTO.setUserId(123);

        when(paymentsService.savePayment(any(PaymentsDTO.class))).thenReturn(paymentsDTO);

        mockMvc.perform(MockMvcRequestBuilders.post("/payments")
                        .contentType(MediaType.APPLICATION_JSON)
                        .param("userId", "123")
                        .content("""
                                {"dueDate": "2023-09-08",
                                "status": "UpComing",
                                "expectedAmount": 46245.28,
                                "outstanding": 4687.11}"""))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.userId").value(123));
        verify(paymentsService, times(1)).savePayment(any(PaymentsDTO.class));
    }

    @Test
    void testGetPaymentsByUserId() throws Exception {

        LocalDate dueDate = LocalDate.of(2023, 8, 31);
        List<PaymentsDTO> paymentsList = Arrays.asList(
                new PaymentsDTO(1,"UpComing",dueDate,23232.23,334334.32,3)
        );

        when(paymentsService.getPaymentsByUserId(1)).thenReturn(paymentsList);

        mockMvc.perform(MockMvcRequestBuilders.get("/payments")
                        .param("userId", "1")
                        .accept(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.length()").value(1))
                .andExpect(jsonPath("$[0].userId").value(3))
                .andExpect(jsonPath("$[0].outstanding").value(334334.32));
        verify(paymentsService, times(1)).getPaymentsByUserId(anyInt());
    }

}