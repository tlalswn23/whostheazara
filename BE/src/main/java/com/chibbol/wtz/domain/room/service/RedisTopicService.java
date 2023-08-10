package com.chibbol.wtz.domain.room.service;

import com.chibbol.wtz.domain.room.entity.Game;
import com.chibbol.wtz.domain.room.entity.Room;
import com.chibbol.wtz.domain.room.repository.GameRepository;
import com.chibbol.wtz.domain.room.repository.RoomRepository;
import com.chibbol.wtz.domain.user.exception.UserNotFoundException;
import com.chibbol.wtz.domain.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.redis.listener.ChannelTopic;
import org.springframework.data.redis.listener.RedisMessageListenerContainer;
import org.springframework.stereotype.Service;

import javax.annotation.PostConstruct;
import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

@Slf4j
@RequiredArgsConstructor
@Service
public class RedisTopicService {

    private final UserRepository userRepository;
    // 채팅방(topic)에 발행되는 메시지를 처리할 Listner
    private final RedisMessageListenerContainer redisMessageListener;
    // 구독 처리 서비스
    private final RedisSubscriber redisSubscriber;

    private Map<String, ChannelTopic> topics;

    @PostConstruct
    private void init() {
        topics = new HashMap<>();
    }


    /**
     * 채팅방 입장 : redis에 topic을 만들고 pub/sub 통신을 하기 위해 리스너를 설정
     */
    public void setRoomTopic(String code) {
        // 토픽 추가
        ChannelTopic topic = topics.get(code);
        System.out.println("code0: " + code);
        if (topic == null) {
            topic = new ChannelTopic(code);
        } redisMessageListener.addMessageListener(redisSubscriber, topic);

        topics.put(code, topic);
    }



    public ChannelTopic getTopic(String code) {
        return topics.get(code);
    }

    public String findUserName(Long userSeq) {
        String userName = userRepository.findNicknameByUserSeq(userSeq);
        if (userName == null) {
            throw new UserNotFoundException("유저를 찾을 수 없습니다.");
        }
        return userName;
    }

}
