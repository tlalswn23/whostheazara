package com.chibbol.wtz.domain.chat.repository;

import com.chibbol.wtz.domain.chat.dto.ChatMessageDTO;
import com.chibbol.wtz.domain.chat.dto.ChatRoomDTO;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.redis.core.HashOperations;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Repository;

import javax.annotation.PostConstruct;
import java.util.ArrayList;
import java.util.List;

@RequiredArgsConstructor
@Repository
public class StompChatRoomRepository {
    private static final String CHAT_ROOMS = "chatRoom";
    //Redis
    private final RedisTemplate<String, Object> redisTemplate;
    private HashOperations<String, String, ChatRoomDTO> opsHashChatRoom;
    // 채팅방의 대화 메시지를 발행하기 위한 redis topic 정보. 서버별로 채팅방에 매치되는 topic정보를 Map에 넣어 code로 찾을수 있도록 한다.
    private final Logger logger = LoggerFactory.getLogger(getClass());

    @PostConstruct
    private void init() {
        opsHashChatRoom = redisTemplate.opsForHash();
    }

    /**
     * 채팅방 생성 : 서버간 채팅방 공유를 위해 redis hash에 저장한다.
     */
    public ChatRoomDTO createChatRoom(String title) {
        ChatRoomDTO chatRoomDTO = ChatRoomDTO.builder().title(title).build();
        opsHashChatRoom.put(CHAT_ROOMS, chatRoomDTO.getCode(), chatRoomDTO);
        return chatRoomDTO;
    }


}

