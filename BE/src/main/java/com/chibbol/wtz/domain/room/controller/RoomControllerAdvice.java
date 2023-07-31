package com.chibbol.wtz.domain.room.controller;

import com.chibbol.wtz.domain.room.exception.RoomNotFoundException;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class RoomControllerAdvice {

    @ExceptionHandler({RoomNotFoundException.class})
    public ResponseEntity<String> handlerRoomNotFoundException(RoomNotFoundException e) {
        return ResponseEntity.status(404).body("Room Not Found");
    }
}

