package com.chibbol.wtz.domain.room.repository;

import com.chibbol.wtz.domain.room.dto.JobSettingDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Repository
@RequiredArgsConstructor
public class RoomJobSettingRedisRepository {

    private static final String KEY_PREFIX = "roomExcludeJobSetting";
    private final RedisTemplate<String, Long> redisTemplate;

    public Map<Object, Object> findRoomJobSettingByGameCode(String gameCode) {
        String key = generateKey(gameCode);
        Map<Object, Object> excludeJobSettings = redisTemplate.opsForHash().entries(key);
        return excludeJobSettings;
    }

    public List<Long> findExcludeJobSeqByGameCode(String gameCode) {
        Map<Object, Object> excludeJobSettings = findRoomJobSettingByGameCode(gameCode);
        List<Long> list = new ArrayList<>();
        for(Object l : excludeJobSettings.keySet()) {
            if(!(boolean)excludeJobSettings.get(l)) {
                list.add(Long.parseLong(l.toString()));
            }
        }

        return list;
    }

    public void deleteJobSetting(String code) {
        String key = generateKey(code);
        redisTemplate.delete(key);
    }

    public void setExcludeJobSeq(String gameCode, Long excludeJobSeq, boolean exclude) {
        String key = generateKey(gameCode);
        redisTemplate.opsForHash().put(key, excludeJobSeq, exclude);
    }

    public void setAllJobSetting(String code, JobSettingDTO jobSettingDTOs) {
        String key = generateKey(code);
        for (String field : jobSettingDTOs.getJobSetting().keySet()) {
            redisTemplate.opsForHash().put(key, field, jobSettingDTOs.getJobSetting().get(field));
        }
    }

    private String generateKey(String gameCode) {
        return KEY_PREFIX + ":game:" + gameCode;
    }
}
