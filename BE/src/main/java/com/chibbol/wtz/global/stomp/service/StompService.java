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
    private final RedisSubscriberAll subscriber;
    private Map<String, ChannelTopic> topics;

    @PostConstruct
    private void init() {
        topics = new HashMap<>();
    }

    /**
     *  destination에서 roomCode 추출
     */
    public String getRoomCode(String destination) {
        log.info("getRoomCode 실행");
        log.info("destination"+destination);
        int lastIndex = destination.lastIndexOf('/');

        if (lastIndex != -1) {
            return destination.substring(lastIndex + 1);
        }
        return destination;
    }

    public void addTopic(String gameCode) {
        String topicTitle = String.valueOf(gameCode);
        ChannelTopic topic = topics.get(topicTitle);

        if (topic == null) { // 만약 없으면 토픽 만들고
            topic = new ChannelTopic(topicTitle);
        }

        redisMessageListener.addMessageListener(subscriber, topic);

        topics.put(topicTitle, topic);
    }

    public ChannelTopic getTopic(String gameCode) {
        return topics.get(String.valueOf(gameCode));
    }

}
