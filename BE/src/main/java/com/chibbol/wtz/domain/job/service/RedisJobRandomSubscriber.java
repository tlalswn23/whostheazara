package com.chibbol.wtz.domain.job.service;


import com.chibbol.wtz.domain.job.entity.UserJob;
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
public class RedisJobRandomSubscriber implements MessageListener {
    private final ObjectMapper objectMapper;
    private final RedisTemplate redisTemplate;
    private final SimpMessageSendingOperations messagingTemplate;

    // redis에서 메세지가 발행(publish)되면 대기하고 있던 onMessage가 해당 메세지를 받아 처리
    @Override
    public void onMessage(Message message, byte[] pattern) {
        try {
            // redis에서 발행된 데이터를 받아 deserialize
            String publishMessage = (String) redisTemplate.getStringSerializer().deserialize(message.getBody());
            // room에 있는 User들에게 부여된 직업정보 리스트로 가져오기
            List<UserJob> list = List.of(objectMapper.readValue(publishMessage, UserJob[].class));
            log.info("Random message: "+publishMessage);
            // websocket 구독자에게 리스트를 보낸다
            messagingTemplate.convertAndSend("/sub/job/randomJob/"+list.get(0).getRoom().getRoomSeq(), list);
        } catch (Exception e) {
            log.error(e.getMessage());
        }
    }
}
