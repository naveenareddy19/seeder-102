package com.bc102.seeder.contractservice.service;

import com.bc102.seeder.contractservice.dto.ContractsDTO;
import com.bc102.seeder.contractservice.entity.Contract;
import com.bc102.seeder.contractservice.exceptions.ContractNotFoundException;
import com.bc102.seeder.contractservice.repository.ContractsRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.MockitoAnnotations;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;

class ContractServiceImplTest {

    @Mock
    private ContractsRepository contractsRepository;

    @InjectMocks
    private ContractServiceImpl contractService;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void testFindAll() {
        List<Contract> contractsList = new ArrayList<>();
        contractsList.add(new Contract());

        Mockito.when(contractsRepository.findAll()).thenReturn(contractsList);
        List<Contract> result = contractService.findAll();

        assertNotNull(result);
        assertEquals(contractsList.size(), result.size());
    }

    @Test
    void testGetByContractId() {
        int contractId = 1;
        Contract contract = new Contract();
        Optional<Contract> optionalContract = Optional.of(contract);
        Mockito.when(contractsRepository.findById(contractId)).thenReturn(optionalContract);
        Contract result = contractService.getByContractId(contractId);
        assertNotNull(result);
        assertEquals(contract, result);
    }

    @Test
    void testGetByContractIdNotFound() {
        int contractId = 1;
        Optional<Contract> optionalContract = Optional.empty();
        Mockito.when(contractsRepository.findById(contractId)).thenReturn(optionalContract);
        assertThrows(ContractNotFoundException.class, () -> {
            contractService.getByContractId(contractId);
        });
    }

    @Test
    void testSaveContract() {
        ContractsDTO contractsDTO = new ContractsDTO();
        Contract contractEntity = new Contract();
        Mockito.when(contractsRepository.save(any(Contract.class))).thenReturn(contractEntity);
        contractService.saveContract(contractsDTO);
        Mockito.verify(contractsRepository, Mockito.times(1)).save(any(Contract.class));
    }
}
