package com.bc102.seeder.cashkickservice.exceptions;

import lombok.AllArgsConstructor;
import lombok.Setter;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class CashKickErrorResponse {
    private int status;
    private String message;
    private long timeStamp;
}
