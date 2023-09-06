package com.bc102.seeder.contractservice.exceptions;

public class ContractNotFoundException extends RuntimeException {
    public ContractNotFoundException(String message){
        super(message);
    }
}
