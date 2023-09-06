package com.bc102.seeder.contractservice.service;

import com.bc102.seeder.contractservice.dto.SelectedContractsDTO;
import com.bc102.seeder.contractservice.entity.SelectedContract;
import com.bc102.seeder.contractservice.exceptions.ContractNotFoundException;
import com.bc102.seeder.contractservice.repository.SelectedContractsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SelectedContractServiceImpl implements SelectedContractService {
    private final SelectedContractsRepository selectedContractsRepository;

    @Autowired
    public SelectedContractServiceImpl(SelectedContractsRepository selectedContractRepo) {
        selectedContractsRepository = selectedContractRepo;
    }

    @Override
    public List<SelectedContract> findAll() {
        return selectedContractsRepository.findAll();
    }

    @Override
    public List<SelectedContract> getSelectedContractsByUserID(int userId) {
        List<SelectedContract> contracts = selectedContractsRepository.findContractsByUserId(userId);

        if (contracts.isEmpty()) {
            throw new ContractNotFoundException("Did not find contracts with user id - " + userId);
        }

        return contracts;
    }

    @Override
    public List<SelectedContract> getSelectedContractsByCashKickId(int cashKickId) {
        List<SelectedContract> contracts = selectedContractsRepository.findContractsByCashKickId(cashKickId);

        if (contracts.isEmpty()) {
            throw new ContractNotFoundException("Did not find contracts with cash kick id - " + cashKickId);
        }

        return contracts;
    }

    @Override
    public void saveContract(SelectedContractsDTO selectedContractsDTO) {
        selectedContractsRepository.save(selectedContractsDTO.convertDtoToEntity(selectedContractsDTO));
    }
}
