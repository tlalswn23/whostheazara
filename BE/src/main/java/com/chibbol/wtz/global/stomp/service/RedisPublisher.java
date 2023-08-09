package com.chibbol.wtz.global.stomp.service;

import com.chibbol.wtz.global.stomp.dto.DataDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.listener.ChannelTopic;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class RedisPublisher {
    private final RedisTemplate<String, Object> RedisTemplate;
    public void publish(ChannelTopic topic, DataDTO data){
        RedisTemplate.convertAndSend(topic.getTopic(), data);
    }
}
