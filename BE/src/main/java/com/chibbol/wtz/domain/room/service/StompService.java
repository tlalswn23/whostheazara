package com.chibbol.wtz.domain.room.service;

import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Slf4j
@Service
public class StompService {

    /**
     *  destination에서 roomCode 추출
     */
    public String getRoomCode(String destination) {
        log.info("getRoomCode 실행");
        log.info("destination"+destination);
        int lastIndex = destination.lastIndexOf('/');

        if (lastIndex != -1) {
            return destination.substring(lastIndex + 1);
        }
        return destination;
    }
}
