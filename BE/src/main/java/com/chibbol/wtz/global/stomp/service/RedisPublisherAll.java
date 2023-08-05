package com.chibbol.wtz.global.stomp.service;

import com.chibbol.wtz.global.stomp.dto.dataDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.listener.ChannelTopic;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class RedisPublisherAll {
    private final RedisTemplate<String, Object> RedisTemplate;
    public void publish(ChannelTopic topic, dataDTO data){
        RedisTemplate.convertAndSend(topic.getTopic(), data);
    }
}
