package com.bc102.seeder.paymentsservice.dto;

import com.bc102.seeder.paymentsservice.entity.Payments;
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
public class PaymentsDTO {
    private int id;
    private String status;
    private LocalDate dueDate;
    private double expectedAmount;
    private double outstanding;
    private int userId;

    @Autowired
    private static ModelMapper modelMapper;

    static{
        modelMapper = new ModelMapper();
    }

    public static Payments convertDtoToEntity(PaymentsDTO paymentsDTO){
        modelMapper.getConfiguration().setMatchingStrategy(MatchingStrategies.LOOSE);
        return modelMapper.map(paymentsDTO, Payments.class);
    }
    public static PaymentsDTO convertEntityToDto(Payments payments) {
        modelMapper.getConfiguration().setMatchingStrategy(MatchingStrategies.LOOSE);
        return modelMapper.map(payments, PaymentsDTO.class);
    }
}
