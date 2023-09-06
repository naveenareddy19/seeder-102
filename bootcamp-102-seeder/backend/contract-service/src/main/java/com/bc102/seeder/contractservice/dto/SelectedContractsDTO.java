package com.bc102.seeder.contractservice.dto;

import com.bc102.seeder.contractservice.entity.SelectedContract;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.modelmapper.ModelMapper;
import org.modelmapper.convention.MatchingStrategies;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class SelectedContractsDTO {
    private static final ModelMapper modelMapper;

    static {
        modelMapper = new ModelMapper();
    }

    private int id;
    private double selectedAmount;
    private int userId;
    private int cashKickId;
    private int contractId;

    public static SelectedContractsDTO convertEntityToDto(SelectedContract selectedContracts) {
        modelMapper.getConfiguration().setMatchingStrategy(MatchingStrategies.LOOSE);
        return modelMapper.map(selectedContracts, SelectedContractsDTO.class);
    }

    public SelectedContract convertDtoToEntity(SelectedContractsDTO selectedContractsDTO) {
        modelMapper.getConfiguration().setMatchingStrategy(MatchingStrategies.LOOSE);
        return modelMapper.map(selectedContractsDTO, SelectedContract.class);
    }
}
