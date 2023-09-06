package com.bc102.seeder.cashkickservice.controller;

import com.bc102.seeder.cashkickservice.dto.CashKickDTO;
import com.bc102.seeder.cashkickservice.service.CashKickService;
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

import java.util.ArrayList;
import java.util.List;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

class CashKickControllerTest {

    private MockMvc mockMvc;

    @Rule
    public MockitoRule mockitoRule= MockitoJUnit.rule();

    @Mock
    private CashKickService cashKickService;

    @InjectMocks
    private CashKickController cashKickController;

    @BeforeEach
    public void setUp() {
        MockitoAnnotations.initMocks(this);
        mockMvc = MockMvcBuilders.standaloneSetup(cashKickController).build();
    }

    @Test
    void testSaveCashKick() throws Exception {
        CashKickDTO cashKickDTO = new CashKickDTO();
        cashKickDTO.setUserId(123);

        when(cashKickService.save(any(CashKickDTO.class))).thenReturn(cashKickDTO);

        mockMvc.perform(MockMvcRequestBuilders.post("/cashKicks")
                        .contentType(MediaType.APPLICATION_JSON)
                        .param("userId", "123")
                        .content("""
                                {"name": "My first cashkick",
                                      "status": "pending",
                                      "maturity": "2023-08-08T03:25:47.240Z",
                                      "totalReceived": 253445.28,
                                      "totalFinanced": 223031.85}"""))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.userId").value(123)); // Verify the returned user ID

        verify(cashKickService, times(1)).save(any(CashKickDTO.class));
    }

    @Test
    void testGetCashKicksByUserId() throws Exception {
        List<CashKickDTO> cashKickDTOList = new ArrayList<>();

        when(cashKickService.findAllByUserId(123)).thenReturn(cashKickDTOList);

        mockMvc.perform(MockMvcRequestBuilders.get("/cashKicks")
                        .param("userId", "123"))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("$").isArray());

        verify(cashKickService, times(1)).findAllByUserId(123);
    }

}