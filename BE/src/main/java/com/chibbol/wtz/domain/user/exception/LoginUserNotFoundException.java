package com.ssafy.mafia.domain.user.exception;

public class LoginUserNotFoundException extends RuntimeException {
    public LoginUserNotFoundException(String message) {
        super(message);
    }
}
