package com.bc102.seeder.contractservice.service;

import com.bc102.seeder.contractservice.dto.SelectedContractsDTO;
import com.bc102.seeder.contractservice.entity.SelectedContract;
import com.bc102.seeder.contractservice.exceptions.ContractNotFoundException;
import com.bc102.seeder.contractservice.repository.SelectedContractsRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.MockitoAnnotations;

import java.util.ArrayList;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;

class SelectedContractServiceImplTest {

    @Mock
    private SelectedContractsRepository selectedContractsRepository;

    @InjectMocks
    private SelectedContractServiceImpl selectedContractService;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void testFindAll() {
        List<SelectedContract> contractsList = new ArrayList<>();
        contractsList.add(new SelectedContract());
        Mockito.when(selectedContractsRepository.findAll()).thenReturn(contractsList);
        List<SelectedContract> result = selectedContractService.findAll();
        assertNotNull(result);
        assertEquals(contractsList.size(), result.size());
    }

    @Test
    void testGetSelectedContractsByUserID() {
        int userId = 1;
        List<SelectedContract> contractsList = new ArrayList<>();
        contractsList.add(new SelectedContract());
        Mockito.when(selectedContractsRepository.findContractsByUserId(userId)).thenReturn(contractsList);

        List<SelectedContract> result = selectedContractService.getSelectedContractsByUserID(userId);
        assertNotNull(result);
        assertEquals(contractsList.size(), result.size());
    }

    @Test
    void testGetSelectedContractsByUserIDNotFound() {

        int userId = 1;

        Mockito.when(selectedContractsRepository.findContractsByUserId(userId)).thenReturn(new ArrayList<>());

        assertThrows(ContractNotFoundException.class, () -> {
            selectedContractService.getSelectedContractsByUserID(userId);
        });
    }

    @Test
    void testGetSelectedContractsByCashKickId() {
        int cashKickId = 1;
        List<SelectedContract> contractsList = new ArrayList<>();
        contractsList.add(new SelectedContract());
        Mockito.when(selectedContractsRepository.findContractsByCashKickId(cashKickId)).thenReturn(contractsList);

        List<SelectedContract> result = selectedContractService.getSelectedContractsByCashKickId(cashKickId);

        assertNotNull(result);
        assertEquals(contractsList.size(), result.size());
    }

    @Test
    void testGetSelectedContractsByCashKickIdNotFound() {
        int cashKickId = 1;

        Mockito.when(selectedContractsRepository.findContractsByCashKickId(cashKickId)).thenReturn(new ArrayList<>());

        assertThrows(ContractNotFoundException.class, () -> {
            selectedContractService.getSelectedContractsByCashKickId(cashKickId);
        });
    }

    @Test
    void testSaveContract() {
        SelectedContractsDTO selectedContractsDTO = new SelectedContractsDTO();
        SelectedContract contractEntity = new SelectedContract();

        Mockito.when(selectedContractsRepository.save(any(SelectedContract.class))).thenReturn(contractEntity);

        selectedContractService.saveContract(selectedContractsDTO);

        Mockito.verify(selectedContractsRepository, Mockito.times(1)).save(any(SelectedContract.class));
    }
}
