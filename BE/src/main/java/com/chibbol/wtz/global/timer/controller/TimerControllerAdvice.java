package com.chibbol.wtz.global.timer.controller;

import com.chibbol.wtz.global.timer.exception.TimerNotExistException;
import org.springframework.web.bind.annotation.ExceptionHandler;

public class TimerControllerAdvice {

    @ExceptionHandler(TimerNotExistException.class)
    public void handleTimerNotExistException(TimerNotExistException e) {
        System.out.println("Timer Not Exists");
    }
}
