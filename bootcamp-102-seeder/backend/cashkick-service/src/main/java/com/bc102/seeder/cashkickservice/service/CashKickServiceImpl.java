package com.bc102.seeder.cashkickservice.service;

import com.bc102.seeder.cashkickservice.dto.CashKickDTO;
import com.bc102.seeder.cashkickservice.entity.CashKick;
import com.bc102.seeder.cashkickservice.repository.CashKickRepository;
import jakarta.persistence.PersistenceException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CashKickServiceImpl implements CashKickService{

    @Autowired
    CashKickRepository cashKickRepository;

    @Override
    public CashKickDTO save(CashKickDTO cashKickDTO) {
        CashKick cashKick = CashKickDTO.convertDtoToEntity(cashKickDTO);
        try{
            return CashKickDTO.convertEntityToDto(cashKickRepository.save(cashKick));
        }
        catch (PersistenceException ex){
            throw new PersistenceException(ex.getMessage());
        }
    }


    @Override
    public List<CashKickDTO> findAllByUserId(int theUserId) {
        List<CashKick> cashKicks = cashKickRepository.findByUserId(theUserId);
        return cashKicks.stream().map(CashKickDTO::convertEntityToDto).toList();
    }
}
