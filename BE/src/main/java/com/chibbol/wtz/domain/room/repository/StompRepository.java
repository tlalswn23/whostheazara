package com.chibbol.wtz.domain.room.repository;

import com.chibbol.wtz.domain.room.dto.ChatRoomDTO;
import com.chibbol.wtz.domain.room.exception.RoomNotFoundException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.redis.core.HashOperations;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.core.ValueOperations;
import org.springframework.stereotype.Repository;

import javax.annotation.Resource;
import java.util.List;
import java.util.Optional;

@Repository
@Slf4j
public class StompRepository {

    public static final String USER_COUNT = "USER_COUNT"; // 채팅룸에 입장한 클라이언트수 저장
    public static final String ENTER_INFO = "ENTER_INFO"; // 채팅룸에 입장한 클라이언트의 sessionId와 채팅룸 id를 맵핑한 정보 저장


    private RedisTemplate<?, ?> stompRedisTemplate;
//
//    @Resource(name = "stompRedisTemplate")
//    private HashOperations<String, String, ChatRoomDTO> hashOpsChatRoom;
//
//    @Resource(name = "stompRedisTemplate")
//    private HashOperations<String, String, Set<Long>> hashOpsEnterInfo;
//
//    @Resource(name = "stompRedisTemplate")
//    private ValueOperations<String, String> valueOps;

    /**
     * 채팅방에 들어온 유저 정보 저장
     */
    public void setUserEnterInfo(Long userSeq, String roomCode) {
//        log.info(""+hashOpsEnterInfo);
        if (roomCode == null) {
            throw new RoomNotFoundException("room Code가 존재하지 않습니다.");
        }
        String key = generateKey(ENTER_INFO, roomCode);
        // todo : CurrentSeats 수정
        stompRedisTemplate.opsForHash(key, order, userSeq);
//        hashOpsEnterInfo.put(ENTER_INFO, roomCode, userSeq);
    }

    private String generateKey(String prefix, String roomCode) {
        return prefix + ":roomCode:" + roomCode;
    }

    /**
     * 인원수 추가
     */
    public Long plusUserCount(String roomCode) {
//        return Optional.ofNullable(valueOps.increment(USER_COUNT + "_" + roomCode)).orElse(0L);
    }

    /**
     * 인원수 빼기
     */
    public Long minusUserCount(String roomCode) {
//        return Optional.ofNullable(valueOps.decrement(USER_COUNT + "_" + roomCode)).filter(count -> count > 0).orElse(0L);
    }

    /**
     * roomCode로 userSeq값 얻기
     */
    public String getUserEnterInfo(long userSeq) {
//        return hashOpsEnterInfo.get(ENTER_INFO, userSeq);
    }

//    public User getUserListEnterInfo(String roomCode) {
//        return hashOpsEnterInfo.get(ENTER_INFO, roomCode);
//    }



    public void removeUserEnterInfo(Long uerSeq) {
//        hashOpsEnterInfo.delete(ENTER_INFO, uerSeq);
    }

    // 채팅방 유저수 조회
    public long getUserCount(String roomCode) {
//        return Long.valueOf(Optional.ofNullable(valueOps.get(USER_COUNT + "_" + roomCode)).orElse("0"));
    }
}
