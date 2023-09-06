package com.bc102.seeder.contractservice.service;

import com.bc102.seeder.contractservice.dto.SelectedContractsDTO;
import com.bc102.seeder.contractservice.entity.SelectedContract;

import java.util.List;

public interface SelectedContractService {
    List<SelectedContract> findAll();

    List<SelectedContract> getSelectedContractsByUserID(int userId);

    List<SelectedContract> getSelectedContractsByCashKickId(int cashKickId);

    void saveContract(SelectedContractsDTO selectedContractsDTO);
}
