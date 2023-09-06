package com.bc102.seeder.cashkickservice.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice
public class CashKickExceptionHandler {
    @ExceptionHandler
    public ResponseEntity<CashKickErrorResponse> handleException(Exception exc)
    {
        CashKickErrorResponse error=new CashKickErrorResponse();
        error.setStatus(HttpStatus.BAD_REQUEST.value());
        error.setMessage(exc.getMessage());
        error.setTimeStamp(System.currentTimeMillis());
        return new ResponseEntity<>(error,HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(CustomPersistenceException.class)
    public ResponseEntity<CashKickErrorResponse> handlePersistenceException(CustomPersistenceException ex){
        CashKickErrorResponse error=new CashKickErrorResponse();
        error.setStatus(HttpStatus.INTERNAL_SERVER_ERROR.value());
        error.setMessage(ex.getMessage());
        error.setTimeStamp(System.currentTimeMillis());

        return new ResponseEntity<>(error,HttpStatus.INTERNAL_SERVER_ERROR);
    }
}
