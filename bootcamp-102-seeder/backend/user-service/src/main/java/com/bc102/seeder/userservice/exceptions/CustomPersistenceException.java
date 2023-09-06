package com.bc102.seeder.userservice.exceptions;

public class CustomPersistenceException extends RuntimeException {
    public CustomPersistenceException(String message) {
        super(message);
    }
}
