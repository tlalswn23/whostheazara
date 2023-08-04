package com.chibbol.wtz.domain.job.service;

import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.listener.ChannelTopic;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class RedisJobPublisher {
    private final RedisTemplate RedisTemplate;
    public void publish(ChannelTopic topic, List list){
        RedisTemplate.convertAndSend(topic.getTopic(), list);
    }
}
