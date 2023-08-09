package com.chibbol.wtz.domain.room.service;

import com.chibbol.wtz.domain.room.repository.RoomJobSettingRedisRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@RequiredArgsConstructor
@Service
public class RoomJobSettingRedisService {
    private final RoomJobSettingRedisRepository roomJobSettingRedisRepository;

    public List<Long> findExcludeJobSeqByGameCode(String gameCode) {
        return roomJobSettingRedisRepository.findExcludeJobSeqByGameCode(gameCode);
    }

    public void addExcludeJobSeq(String gameCode, Long excludeJobSeq) {
        roomJobSettingRedisRepository.addExcludeJobSeq(gameCode, excludeJobSeq);
    }

    public void removeExcludeJobSeq(String gameCode, Long excludeJobSeq) {
        roomJobSettingRedisRepository.removeExcludeJobSeq(gameCode, excludeJobSeq);
    }

    public boolean findByGameCodeAndJobSeq(String gameCode, Long jobSeq) {
        return roomJobSettingRedisRepository.findByGameCodeAndJobSeq(gameCode, jobSeq);
    }

}
