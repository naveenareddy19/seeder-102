package com.bc102.seeder.contractservice.repository;

import com.bc102.seeder.contractservice.entity.Contract;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ContractsRepository extends JpaRepository<Contract,Integer> {
}
