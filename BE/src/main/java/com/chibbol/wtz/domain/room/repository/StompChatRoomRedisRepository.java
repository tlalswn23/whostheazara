package com.chibbol.wtz.domain.room.repository;

import com.chibbol.wtz.domain.room.dto.ChatRoomDTO;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.redis.core.HashOperations;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Repository;

import javax.annotation.PostConstruct;

@RequiredArgsConstructor
@Repository
public class StompChatRoomRedisRepository {

    // Redis CacheKeys
    private static final String CHAT_ROOMS = "CHAT_ROOM"; // 채팅룸 저장

    //Redis
    private final RedisTemplate<String, Object> stompRedisTemplate;
    private HashOperations<String, String, ChatRoomDTO> opsHashChatRoom;
    // 채팅방의 대화 메시지를 발행하기 위한 redis topic 정보. 서버별로 채팅방에 매치되는 topic정보를 Map에 넣어 code로 찾을수 있도록 한다.
    private final Logger logger = LoggerFactory.getLogger(getClass());


    @PostConstruct
    private void init() {
        opsHashChatRoom = stompRedisTemplate.opsForHash();
    }

}

