package com.chibbol.wtz.domain.job.service;


import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.redis.listener.ChannelTopic;
import org.springframework.data.redis.listener.RedisMessageListenerContainer;
import org.springframework.stereotype.Service;

import javax.annotation.PostConstruct;
import java.util.HashMap;
import java.util.Map;

@Service
@Slf4j
@RequiredArgsConstructor
public class StompJobService {
    // 채팅방(topic)에 발행되는 메시지를 처리할 Listner
    private final RedisMessageListenerContainer redisMessageListener;
    // 구독 처리 서비스
    private final RedisJobRandomSubscriber randomSubscriber;
    private final RedisJobResultSubscriber resultSubscriber;
    private Map<String, ChannelTopic> topics;

    @PostConstruct
    private void init() {
        topics = new HashMap<>();
    }

    public void addJobTopic(String topicTitle) {
        ChannelTopic topic = topics.get(topicTitle); // topics에서 방에 맞는 토픽 찾기?

        if (topic == null) { // 만약 없으면 토픽 만들고
            topic = new ChannelTopic(topicTitle);
        }

        // topic에 따라 redisSubscriber 따로 저장 "/"포함되면 result
        if(topicTitle.contains("/")){
            redisMessageListener.addMessageListener(resultSubscriber, topic);
        }
        else{
            // 리스너에 해당 토픽 등록
            redisMessageListener.addMessageListener(randomSubscriber, topic);
        }

        topics.put(topicTitle, topic);
    }

    public ChannelTopic getTopic(String topicRoomSeq) {
        return topics.get(topicRoomSeq);
    }

}
