package com.bc102.seeder.contractservice.service;

import com.bc102.seeder.contractservice.dto.ContractsDTO;
import com.bc102.seeder.contractservice.entity.Contract;

import java.util.List;

public interface ContractService {

    public List<Contract> findAll();
    public Contract getByContractId(int contractId);
    public void saveContract(ContractsDTO contractsDTO);
}
