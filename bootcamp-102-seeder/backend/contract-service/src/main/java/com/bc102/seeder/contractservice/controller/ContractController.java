package com.bc102.seeder.contractservice.controller;

import com.bc102.seeder.contractservice.dto.ContractsDTO;
import com.bc102.seeder.contractservice.entity.Contract;
import com.bc102.seeder.contractservice.exceptions.ContractNotFoundException;
import com.bc102.seeder.contractservice.service.ContractService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@RestController
@RequestMapping("/contracts")
public class ContractController {
    @Autowired
    private ContractService contractService;

    @GetMapping("")
    public List<Contract> findAll() {
        return contractService.findAll();
    }

    @GetMapping("/{contractId}")
    public Contract findById(@PathVariable int contractId) {
        try {
            return contractService.getByContractId(contractId);
        } catch (ContractNotFoundException ex) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Contract id not found", ex);
        }
    }

    @PostMapping("")
    public ContractsDTO addContract(@RequestBody ContractsDTO theContract) {
        contractService.saveContract(theContract);
        return theContract;
    }
}
