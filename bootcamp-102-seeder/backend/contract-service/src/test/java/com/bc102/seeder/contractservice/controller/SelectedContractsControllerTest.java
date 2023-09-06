package com.bc102.seeder.contractservice.controller;

import com.bc102.seeder.contractservice.dto.SelectedContractsDTO;
import com.bc102.seeder.contractservice.entity.SelectedContract;
import com.bc102.seeder.contractservice.service.SelectedContractService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import java.util.ArrayList;
import java.util.List;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

class SelectedContractControllerTest {

    private MockMvc mockMvc;

    @Mock
    private SelectedContractService selectedContractService;

    @InjectMocks
    private SelectedContractController selectedContractsController;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
        mockMvc = MockMvcBuilders.standaloneSetup(selectedContractsController).build();
    }

    @Test
    void testFindAll() throws Exception {
        List<SelectedContract> contractsList = new ArrayList<>();
        contractsList.add(new SelectedContract());

        when(selectedContractService.findAll()).thenReturn(contractsList);

        mockMvc.perform(get("/contracts/selected-contracts"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$").isArray())
                .andExpect(jsonPath("$.length()").value(contractsList.size()));
        verify(selectedContractService, times(1)).findAll();
    }

    @Test
    void testFindContractsByUserId() throws Exception {
        int userId = 1;
        List<SelectedContract> contractsList = new ArrayList<>();
        contractsList.add(new SelectedContract());
        when(selectedContractService.getSelectedContractsByUserID(userId)).thenReturn(contractsList);

        mockMvc.perform(get("/contracts/selected-contracts/user/{userId}", userId))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$").isArray())
                .andExpect(jsonPath("$.length()").value(contractsList.size()));

        verify(selectedContractService, times(1)).getSelectedContractsByUserID(userId);
    }

    @Test
    void testFindContractsByCashKickId() throws Exception {
        int cashKickId = 1;
        List<SelectedContract> contractsList = new ArrayList<>();
        contractsList.add(new SelectedContract());

        when(selectedContractService.getSelectedContractsByCashKickId(cashKickId)).thenReturn(contractsList);

        mockMvc.perform(get("/contracts/selected-contracts/cashkick/{cashKickId}", cashKickId))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$").isArray())
                .andExpect(jsonPath("$.length()").value(contractsList.size()));

        verify(selectedContractService, times(1)).getSelectedContractsByCashKickId(cashKickId);
    }

    @Test
    void testSaveContract() throws Exception {
        SelectedContractsDTO selectedContractsDTO = new SelectedContractsDTO();

        mockMvc.perform(post("/contracts/selected-contracts")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(asJsonString(selectedContractsDTO)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.selectedAmount").value(selectedContractsDTO.getSelectedAmount()));
        verify(selectedContractService, times(1)).saveContract(any(SelectedContractsDTO.class));
    }
    private String asJsonString(final Object obj) {
        try {
            return new ObjectMapper().writeValueAsString(obj);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }
}
