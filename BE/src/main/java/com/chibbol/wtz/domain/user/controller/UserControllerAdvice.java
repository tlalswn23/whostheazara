package com.chibbol.wtz.domain.user.controller;

import com.chibbol.wtz.domain.user.exception.*;
import com.chibbol.wtz.global.email.exception.EmailCodeNotMatchException;
import com.chibbol.wtz.global.email.exception.EmailSendingFailedException;
import com.chibbol.wtz.global.email.exception.ResendTimeNotExpiredException;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class UserControllerAdvice {
    // 404 Not Found
    @ExceptionHandler({UserNotFoundException.class, LoginUserNotFoundException.class})
    public ResponseEntity<Void> handleUserNotFoundException(UserNotFoundException e) {
        return ResponseEntity.notFound().build();
    }

    // 401 Unauthorized
    @ExceptionHandler(InvalidPasswordException.class)
    public ResponseEntity<Void> handleInvalidPasswordException(InvalidPasswordException e) {
        return ResponseEntity.status(401).build();
    }

    // 409 Conflict
    @ExceptionHandler(DuplicateEmailException.class)
    public ResponseEntity<Void> handleDuplicateEmailException(DuplicateEmailException e) {
        return ResponseEntity.status(409).build();
    }

    @ExceptionHandler(TextFormatException.class)
    public ResponseEntity<Void> handleTextFormatException(TextFormatException e) {
        return ResponseEntity.status(422).build();
    }

    @ExceptionHandler(ResendTimeNotExpiredException.class)
    public ResponseEntity<Void> handleResendTimeNotExpiredException(ResendTimeNotExpiredException e) {
        return ResponseEntity.status(429).build();
    }

    @ExceptionHandler(EmailSendingFailedException.class)
    public ResponseEntity<Void> handleEmailSendingFailedException(EmailSendingFailedException e) {
        return ResponseEntity.status(502).build();
    }

    @ExceptionHandler(EmailCodeNotMatchException.class)
    public ResponseEntity<Void> handleEmailCodeNotMatchException(EmailCodeNotMatchException e) {
        return ResponseEntity.status(400).build();
    }
}
