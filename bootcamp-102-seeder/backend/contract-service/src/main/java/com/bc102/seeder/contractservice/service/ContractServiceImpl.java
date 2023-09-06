package com.bc102.seeder.contractservice.service;

import com.bc102.seeder.contractservice.dto.ContractsDTO;
import com.bc102.seeder.contractservice.entity.Contract;
import com.bc102.seeder.contractservice.exceptions.ContractNotFoundException;
import com.bc102.seeder.contractservice.repository.ContractsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ContractServiceImpl implements ContractService {
    private final ContractsRepository contractsRepository;

    @Autowired
    public ContractServiceImpl(ContractsRepository theContractRepo) {
        contractsRepository = theContractRepo;
    }

    @Override
    public List<Contract> findAll() {
        return contractsRepository.findAll();
    }

    @Override
    public Contract getByContractId(int contractId) {
        try {
            Optional<Contract> contracts = contractsRepository.findById(contractId);
            return contracts.orElseThrow(() -> new ContractNotFoundException("Did not find contract with id - " + contractId));
        } catch (ContractNotFoundException ex) {
            throw ex;
        }
    }
    @Override
    public void saveContract(ContractsDTO contractsDTO) {
        contractsRepository.save(contractsDTO.convertDtoToEntity(contractsDTO));
    }
}
