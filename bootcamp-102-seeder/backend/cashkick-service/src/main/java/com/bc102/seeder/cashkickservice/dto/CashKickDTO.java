package com.bc102.seeder.cashkickservice.dto;

import com.bc102.seeder.cashkickservice.entity.CashKick;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.modelmapper.ModelMapper;
import org.modelmapper.convention.MatchingStrategies;
import org.springframework.beans.factory.annotation.Autowired;

import java.time.LocalDate;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class CashKickDTO {
    private int id;
    private String name;
    private String status;
    private LocalDate maturity;
    private Double totalReceived;
    private Double totalFinanced;
    private int userId;

    @Autowired
    private static ModelMapper modelMapper;

    static{
        modelMapper = new ModelMapper();
    }

    public static CashKick convertDtoToEntity(CashKickDTO cashkickDTO){
        modelMapper.getConfiguration().setMatchingStrategy(MatchingStrategies.LOOSE);
        return modelMapper.map(cashkickDTO, CashKick.class);
    }
    public static CashKickDTO convertEntityToDto(CashKick cashkick) {
        modelMapper.getConfiguration().setMatchingStrategy(MatchingStrategies.LOOSE);
        return modelMapper.map(cashkick, CashKickDTO.class);
    }
}
