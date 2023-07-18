package com.ssafy.mafia.email.exception;

public class EmailCodeNotMatchException extends RuntimeException {
    public EmailCodeNotMatchException(String message) {
        super(message);
    }
}