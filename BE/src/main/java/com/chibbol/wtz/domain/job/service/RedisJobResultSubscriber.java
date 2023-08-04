package com.chibbol.wtz.domain.job.service;

import com.chibbol.wtz.domain.job.entity.UserAbilityRecord;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.redis.connection.Message;
import org.springframework.data.redis.connection.MessageListener;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.stereotype.Service;

import java.util.List;

@Slf4j
@RequiredArgsConstructor
@Service
public class RedisJobResultSubscriber implements MessageListener {
    private final ObjectMapper objectMapper;
    private final RedisTemplate redisTemplate;
    private final SimpMessageSendingOperations messagingTemplate;

    @Override
    public void onMessage(Message message, byte[] pattern) {
        try {
            // redis에서 발행된 데이터를 받아 deserialize
            String publishMessage = (String) redisTemplate.getStringSerializer().deserialize(message.getBody());
            // room에 있는 User들에게 부여된 직업정보 리스트로 가져오기
            List<UserAbilityRecord> list = List.of(objectMapper.readValue(publishMessage, UserAbilityRecord[].class));
            log.info("Result message: "+publishMessage);
            // websocket 구독자에게 리스트를 보낸다
            messagingTemplate.convertAndSend("/sub/job/result/"+list.get(0).getRoomSeq()+"/"+list.get(0).getTurn(), list);
        } catch (Exception e) {
            log.error(e.getMessage());
        }
    }
}
