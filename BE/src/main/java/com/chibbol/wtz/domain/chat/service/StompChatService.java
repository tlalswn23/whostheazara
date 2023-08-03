package com.chibbol.wtz.domain.chat.service;

import com.chibbol.wtz.domain.chat.dto.ChatMessageDTO;
import com.chibbol.wtz.domain.chat.repository.StompChatRoomRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.listener.ChannelTopic;
import org.springframework.data.redis.listener.RedisMessageListenerContainer;
import org.springframework.stereotype.Service;

import javax.annotation.PostConstruct;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RequiredArgsConstructor
@Service
public class StompChatService {

    private final StompChatRoomRepository stompChatRoomRepository;
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
     * 채팅방 입장 : redis에 topic을 만들고 pub/sub 통신을 하기 위해 리스너를 설정한다.
     */
    public void enterChatRoom(String code) {
        ChannelTopic topic = topics.get(code);
        if (topic == null) {
            topic = new ChannelTopic(code);
        }
        redisMessageListener.addMessageListener(redisSubscriber, topic);
        topics.put(code, topic);
    }

    public ChannelTopic getTopic(String code) {
        return topics.get(code);
    }

}
