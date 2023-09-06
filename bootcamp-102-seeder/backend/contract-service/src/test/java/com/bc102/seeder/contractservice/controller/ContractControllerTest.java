package com.bc102.seeder.contractservice.controller;

import com.bc102.seeder.contractservice.dto.ContractsDTO;
import com.bc102.seeder.contractservice.entity.Contract;
import com.bc102.seeder.contractservice.exceptions.ContractNotFoundException;
import com.bc102.seeder.contractservice.service.ContractService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.web.server.ResponseStatusException;

import java.util.ArrayList;
import java.util.List;

import static org.junit.Assert.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

class ContractControllerTest {

    private MockMvc mockMvc;

    @Mock
    private ContractService contractService;

    @InjectMocks
    private ContractController contractController;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
        mockMvc = MockMvcBuilders.standaloneSetup(contractController).build();
    }

    @Test
    void testFindAll() throws Exception {
        List<Contract> contractsList = new ArrayList<>();
        contractsList.add(new Contract(1,"Contract1","Monthly",12000.0,12,12.0,63750,"Pending"));

        when(contractService.findAll()).thenReturn(contractsList);

        mockMvc.perform(get("/contracts"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$").isArray())
                .andExpect(jsonPath("$.length()").value(contractsList.size()));

        verify(contractService, times(1)).findAll();
    }

    @Test
    void testFindById() throws Exception {
        int contractId = 1;
        Contract contract =  new Contract(1,"Contract1","Monthly",12000.0,12,12.0,63750,"Pending");
        when(contractService.getByContractId(contractId)).thenReturn(contract);

        mockMvc.perform(get("/contracts/{contractId}", contractId))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(contract.getId()));

        verify(contractService, times(1)).getByContractId(contractId);
    }

    @Test
    void testFindByIdNotFound() throws Exception {
        int contractId = 1;
        when(contractService.getByContractId(contractId)).thenThrow(new ContractNotFoundException("Test message"));

        mockMvc.perform(get("/contracts/{contractId}", contractId))
                .andExpect(status().isNotFound())
                .andExpect(result -> assertTrue(result.getResolvedException() instanceof ResponseStatusException))
                .andExpect(result -> {
                    ResponseStatusException ex = (ResponseStatusException) result.getResolvedException();
                    assertEquals("Contract id not found", ex.getReason());
                });

        verify(contractService, times(1)).getByContractId(contractId);
    }


    @Test
    void testAddContract() throws Exception {
        ContractsDTO contractsDTO = new ContractsDTO();
        Contract contractEntity = new Contract(1,"Contract1","Monthly",12000.0,12,12.0,63750,"Pending");
        mockMvc.perform(post("/contracts")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(asJsonString(contractsDTO)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.name").value(contractsDTO.getName()));

        verify(contractService, times(1)).saveContract(any(ContractsDTO.class));
    }

    private String asJsonString(final Object obj) {
        try {
            return new ObjectMapper().writeValueAsString(obj);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }
}
