package com.bc102.seeder.contractservice.exceptions;

import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class ContractErrorResponse
{
    private int status;
    private String message;
    private long timeStamp;
}
