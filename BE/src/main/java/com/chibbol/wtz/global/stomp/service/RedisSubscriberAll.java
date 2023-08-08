package com.chibbol.wtz.global.stomp.service;

import com.chibbol.wtz.global.stomp.dto.DataDTO;

import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.redis.connection.Message;
import org.springframework.data.redis.connection.MessageListener;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.stereotype.Service;

@Slf4j
@RequiredArgsConstructor
@Service
public class RedisSubscriberAll implements MessageListener {
    private final ObjectMapper objectMapper;
    private final RedisTemplate redisTemplate;
    private final SimpMessageSendingOperations messagingTemplate;

    @Override
    public void onMessage(Message message, byte[] pattern) {
        try {
            String publishMessage = (String) redisTemplate.getStringSerializer().deserialize(message.getBody());
            DataDTO data = objectMapper.readValue(publishMessage, DataDTO.class);
            if(data.getType().equals("ABILITY")){
                log.info("/sub/game/"+data.getGameCode()+"/zara \t" + "message: "+publishMessage);
                messagingTemplate.convertAndSend("/sub/game/"+data.getGameCode()+"/zara", data);
            }else{
                log.info("/sub/game/"+data.getGameCode()+"/all \t" + "message: "+publishMessage);
                messagingTemplate.convertAndSend("/sub/game/"+data.getGameCode()+"/all", data);
            }
        } catch (Exception e) {
            log.error(e.getMessage());
        }
    }
}
