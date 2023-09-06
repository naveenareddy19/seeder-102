package com.bc102.seeder.contractservice.repository;

import com.bc102.seeder.contractservice.entity.SelectedContract;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;


public interface SelectedContractsRepository extends JpaRepository<SelectedContract, Integer> {
    List<SelectedContract> findContractsByUserId(int userId);
    List<SelectedContract> findContractsByCashKickId(int cashKickId);
}
