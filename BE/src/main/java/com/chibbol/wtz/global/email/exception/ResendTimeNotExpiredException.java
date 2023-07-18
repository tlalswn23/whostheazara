package com.ssafy.mafia.email.exception;

public class ResendTimeNotExpiredException extends RuntimeException {
    public ResendTimeNotExpiredException(String message) {
        super(message);
    }
}
