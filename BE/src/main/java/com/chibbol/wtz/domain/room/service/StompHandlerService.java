package com.chibbol.wtz.domain.room.service;

import org.springframework.data.redis.listener.ChannelTopic;
import org.springframework.stereotype.Service;

import java.util.Map;

@Service
public class StompHandlerService {

    private Map<String, ChannelTopic> topics;

    public ChannelTopic getTopic(String code) {
        return topics.get(code);
    }
}
