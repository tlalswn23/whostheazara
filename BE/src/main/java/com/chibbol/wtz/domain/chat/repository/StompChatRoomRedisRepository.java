package com.chibbol.wtz.domain.chat.repository;

import com.chibbol.wtz.domain.chat.dto.ChatRoomDTO;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.redis.core.HashOperations;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.core.ValueOperations;
import org.springframework.stereotype.Repository;

import javax.annotation.PostConstruct;
import java.util.Optional;

@RequiredArgsConstructor
@Repository
public class StompChatRoomRedisRepository {

    // Redis CacheKeys
    private static final String CHAT_ROOMS = "CHAT_ROOM"; // 채팅룸 저장
    public static final String USER_COUNT = "USER_COUNT"; // 채팅룸에 입장한 클라이언트수 저장
    public static final String ENTER_INFO = "ENTER_INFO"; // 채팅룸에 입장한 클라이언트의 sessionId와 채팅룸 id를 맵핑한 정보 저장
    //Redis
    private final RedisTemplate<String, Object> stompRedisTemplate;
    private HashOperations<String, String, ChatRoomDTO> opsHashChatRoom;
    // 채팅방의 대화 메시지를 발행하기 위한 redis topic 정보. 서버별로 채팅방에 매치되는 topic정보를 Map에 넣어 code로 찾을수 있도록 한다.
    private final Logger logger = LoggerFactory.getLogger(getClass());

    private HashOperations<String, String, ChatRoomDTO> hashOpsChatRoom;
    private HashOperations<String, String, String> hashOpsEnterInfo;
    private ValueOperations<String, String> valueOps;

    @PostConstruct
    private void init() {
        opsHashChatRoom = stompRedisTemplate.opsForHash();
    }

    /**
     * 채팅방 생성 : 서버간 채팅방 공유를 위해 redis hash에 저장한다.
     */
    public ChatRoomDTO createChatRoom(String title) {
        ChatRoomDTO chatRoomDTO = ChatRoomDTO.builder().title(title).build();
        opsHashChatRoom.put(CHAT_ROOMS, chatRoomDTO.getCode(), chatRoomDTO);
        return chatRoomDTO;
    }

    /**
     * 채팅방에 들어온 유저 정보 저장
     */
    public void setUserEnterInfo(String sessionId, String roomCode) {
        hashOpsEnterInfo.put(ENTER_INFO, sessionId, roomCode);

    }

    /**
     * 채팅방에 들어온 유저 관리
     */
    public Long plusUserCount(String roomCode) {
        return Optional.ofNullable(valueOps.increment(USER_COUNT + "_" + roomCode)).orElse(0L);
    }

    /**
     * 채팅방에 들어온 유저 관리
     */
    public Long minusUserCount(String roomCode) {
        return Optional.ofNullable(valueOps.decrement(USER_COUNT + "_" + roomCode)).filter(count -> count > 0).orElse(0L);
    }

    public String getUserEnterRoomId(String sessionId) {
        return hashOpsEnterInfo.get(ENTER_INFO, sessionId);
    }

    public void removeUserEnterInfo(String sessionId) {
        hashOpsEnterInfo.delete(ENTER_INFO, sessionId);
    }
}

