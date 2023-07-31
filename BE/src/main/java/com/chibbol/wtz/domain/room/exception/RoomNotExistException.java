package com.chibbol.wtz.domain.room.exception;

public class RoomNotExistException extends RuntimeException {
    public RoomNotExistException(String message) {
        super(message);
    }
}
