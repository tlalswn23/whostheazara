package com.chibbol.wtz.domain.chat.service;

import com.chibbol.wtz.domain.chat.dto.ChatMessageDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.listener.ChannelTopic;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Service
public class RedisPublisher {
    private final RedisTemplate<String, Object> stompRedisTemplate;

    public void publish(ChannelTopic topic, ChatMessageDTO chatMessageDTO) {
        // 메세지를 redis topic에 발행
        stompRedisTemplate.convertAndSend(topic.getTopic(), chatMessageDTO);
    }

}
