package com.chibbol.wtz.domain.room.service;

import com.chibbol.wtz.domain.room.dto.JobSettingDTO;
import com.chibbol.wtz.domain.room.repository.RoomJobSettingRedisRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@RequiredArgsConstructor
@Service
public class RoomJobSettingRedisService {
    private final RoomJobSettingRedisRepository roomJobSettingRedisRepository;

    public Map<Object, Object> findRoomJobSettingByGameCode(String gameCode) {
        return roomJobSettingRedisRepository.findRoomJobSettingByGameCode(gameCode);
    }

    public List<Long> findExcludeJobSeqByRoomCode(String roomCode) {
        return roomJobSettingRedisRepository.findExcludeJobSeqByRoomCode(roomCode);
    }

    public void setExcludeJobSeq(String gameCode, Long excludeJobSeq, boolean exclude) {
        roomJobSettingRedisRepository.setExcludeJobSeq(gameCode, excludeJobSeq, exclude);
    }

    public void setAllJobSetting(String roomCode, JobSettingDTO jobSettingDTO) {
        roomJobSettingRedisRepository.setAllJobSetting(roomCode, jobSettingDTO);
    }
}
