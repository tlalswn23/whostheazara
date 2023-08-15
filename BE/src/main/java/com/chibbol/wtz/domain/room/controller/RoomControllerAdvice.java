package com.chibbol.wtz.domain.room.controller;

import com.chibbol.wtz.domain.room.exception.RoomNotFoundException;

import com.chibbol.wtz.domain.room.exception.SeatNotFoundException;
import com.chibbol.wtz.domain.room.exception.UserAlreadyLoginException;
import com.chibbol.wtz.domain.room.exception.UserAlreadyExitRoomException;
import com.chibbol.wtz.domain.room.exception.TitleValidationException;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.util.concurrent.TimeoutException;

@RestControllerAdvice
public class RoomControllerAdvice {

    @ExceptionHandler({RoomNotFoundException.class})
    public ResponseEntity<String> handlerRoomNotFoundException(RoomNotFoundException e) {
        return ResponseEntity.status(404).body("Room Not Found");
    }

    @ExceptionHandler({SeatNotFoundException.class})
    public ResponseEntity<String> handlerSeatNotFoundException(SeatNotFoundException e) {
        return ResponseEntity.status(404).body("Seat Not Found");
    }

    @ExceptionHandler({UserAlreadyLoginException.class})
    public ResponseEntity<String> handlerUserAlreadyLoginException(UserAlreadyLoginException e) {
        return ResponseEntity.status(404).body("User Already Login");
    }

    @ExceptionHandler({UserAlreadyExitRoomException.class})
    public ResponseEntity<String> handlerUserAlreadyUnsubscribeException(UserAlreadyExitRoomException e) {
        return ResponseEntity.status(404).body("User Already Exit Room");

    @ExceptionHandler({TitleValidationException.class})
    public ResponseEntity<String> handlerTitleValidationException(TitleValidationException e){
        return ResponseEntity.status(404).body("Title length not Valid");
    }
}

