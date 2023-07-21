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
    public ResponseEntity<String> handleUserNotFoundException(UserNotFoundException e) {
        return ResponseEntity.status(404).body("User Not Found");
    }

    // 401 Unauthorized
    @ExceptionHandler(InvalidPasswordException.class)
    public ResponseEntity<String> handleInvalidPasswordException(InvalidPasswordException e) {
        return ResponseEntity.status(401).body("Invalid Password");
    }

    // 409 Conflict
    @ExceptionHandler(DuplicateEmailException.class)
    public ResponseEntity<String> handleDuplicateEmailException(DuplicateEmailException e) {
        return ResponseEntity.status(409).body("Duplicate Email");
    }

    @ExceptionHandler(TextFormatException.class)
    public ResponseEntity<Void> handleTextFormatException(TextFormatException e) {
        return ResponseEntity.status(422).build();
    }

    @ExceptionHandler(ResendTimeNotExpiredException.class)
    public ResponseEntity<String> handleResendTimeNotExpiredException(ResendTimeNotExpiredException e) {
        return ResponseEntity.status(429).body("Resend Time Not Expired");
    }

    @ExceptionHandler(EmailSendingFailedException.class)
    public ResponseEntity<String> handleEmailSendingFailedException(EmailSendingFailedException e) {
        return ResponseEntity.status(502).body("Email Send Fail");
    }

    @ExceptionHandler(EmailCodeNotMatchException.class)
    public ResponseEntity<String> handleEmailCodeNotMatchException(EmailCodeNotMatchException e) {
        return ResponseEntity.status(400).body("Verification Code Not Match");
    }
}
