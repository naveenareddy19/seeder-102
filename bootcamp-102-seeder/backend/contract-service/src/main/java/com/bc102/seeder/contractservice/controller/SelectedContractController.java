package com.bc102.seeder.contractservice.controller;

import com.bc102.seeder.contractservice.dto.SelectedContractsDTO;
import com.bc102.seeder.contractservice.entity.SelectedContract;
import com.bc102.seeder.contractservice.service.SelectedContractService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/contracts/selected-contracts")
public class SelectedContractController {
    @Autowired
    private SelectedContractService selectedContractService;

    @GetMapping("")
    public List<SelectedContract> findAll() {
        return selectedContractService.findAll();
    }

    @GetMapping("/user/{userId}")
    public List<SelectedContract> findContractsByUserId(@PathVariable int userId) {
        return selectedContractService.getSelectedContractsByUserID(userId);
    }

    @GetMapping("/cashkick/{cashKickId}")
    public List<SelectedContract> findContractsByCashKickId(@PathVariable int cashKickId) {
        return selectedContractService.getSelectedContractsByCashKickId(cashKickId);
    }

    @PostMapping("")
    public SelectedContractsDTO saveContract(@RequestBody SelectedContractsDTO theSelectedContractDto) {
        selectedContractService.saveContract(theSelectedContractDto);
        return theSelectedContractDto;
    }
}
