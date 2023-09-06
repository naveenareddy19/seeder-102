package com.bc102.seeder.paymentsservice.exceptions;

public class CustomPersistenceException extends RuntimeException {
    public CustomPersistenceException(String message) {
        super(message);
    }
}
