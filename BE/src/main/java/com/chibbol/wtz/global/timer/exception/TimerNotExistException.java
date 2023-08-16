package com.chibbol.wtz.global.timer.exception;

public class TimerNotExistException extends RuntimeException {
    public TimerNotExistException(String message) {
        super(message);
    }
}
