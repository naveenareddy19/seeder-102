package com.bc102.seeder.cashkickservice.service;

import com.bc102.seeder.cashkickservice.dto.CashKickDTO;

import java.util.List;

public interface CashKickService {
    public CashKickDTO save(CashKickDTO cashKickDTO);
    public List<CashKickDTO> findAllByUserId(int theUserId);
}
