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

    public void setExcludeJobSeq(String gameCode, Long excludeJobSeq, boolean exclude) {
        roomJobSettingRedisRepository.setExcludeJobSeq(gameCode, excludeJobSeq, exclude);
    }
}
