package com.bc102.seeder.contractservice.dto;

import com.bc102.seeder.contractservice.entity.Contract;
import lombok.*;
import org.modelmapper.ModelMapper;
import org.modelmapper.convention.MatchingStrategies;
import org.springframework.beans.factory.annotation.Autowired;

@Getter
@Setter
@ToString
@AllArgsConstructor
@NoArgsConstructor
public class ContractsDTO {
    @Autowired
    private static final ModelMapper modelMapper;

    static {
        modelMapper = new ModelMapper();
    }

    private int id;
    private String name;
    private String type;
    private double perPayment;
    private int termLength;
    private double termFee;
    private double paymentAmount;
    private String status;

    public static ContractsDTO convertEntityToDto(Contract contracts) {
        modelMapper.getConfiguration().setMatchingStrategy(MatchingStrategies.LOOSE);
        return modelMapper.map(contracts, ContractsDTO.class);
    }

    public Contract convertDtoToEntity(ContractsDTO contractsDTO) {
        modelMapper.getConfiguration().setMatchingStrategy(MatchingStrategies.LOOSE);
        return modelMapper.map(contractsDTO, Contract.class);
    }

}
