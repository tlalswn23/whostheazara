package com.chibbol.wtz.global.stomp.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.redis.listener.ChannelTopic;
import org.springframework.data.redis.listener.RedisMessageListenerContainer;
import org.springframework.stereotype.Service;

import javax.annotation.PostConstruct;
import java.util.HashMap;
import java.util.Map;

@Slf4j
@Service
@RequiredArgsConstructor
public class StompService {

    // 채팅방(topic)에 발행되는 메시지를 처리할 Listner
    private final RedisMessageListenerContainer redisMessageListener;
    // 구독 처리 서비스
    private final RedisSubscriber subscriber;
    private Map<String, ChannelTopic> topics;

    @PostConstruct
    private void init() {
        topics = new HashMap<>();
    }

    public void addTopic(String code) {
        ChannelTopic topic = topics.get(code);

        if (topic == null) { // 만약 없으면 토픽 만들고
            topic = new ChannelTopic(code);
        }

        redisMessageListener.addMessageListener(subscriber, topic);

        topics.put(code, topic);
    }

    public ChannelTopic getTopic(String code) {
        return topics.get(code);
    }

}
