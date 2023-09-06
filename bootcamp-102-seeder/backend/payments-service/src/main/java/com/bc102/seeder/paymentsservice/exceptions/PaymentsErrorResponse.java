package com.bc102.seeder.paymentsservice.exceptions;

import lombok.AllArgsConstructor;
import lombok.Setter;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class PaymentsErrorResponse {
    private int status;
    private String message;
    private long timeStamp;
}
