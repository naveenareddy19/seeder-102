package com.bc102.seeder.cashkickservice.controller;

import com.bc102.seeder.cashkickservice.dto.CashKickDTO;
import com.bc102.seeder.cashkickservice.service.CashKickService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/cashKicks")
public class CashKickController {
    @Autowired
    CashKickService cashKickService;

    @PostMapping("")
    public CashKickDTO saveCashKick(@RequestBody CashKickDTO cashKickDTO){
        return cashKickService.save(cashKickDTO);
    }

    @GetMapping("")
    public List<CashKickDTO> getCashKicks(@RequestParam int userId){
        return cashKickService.findAllByUserId(userId);
    }

}
