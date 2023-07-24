package com.chibbol.wtz.domain.room.handler;

import com.chibbol.wtz.domain.room.service.RoomService;
import com.chibbol.wtz.domain.room.dto.ChatMessageDTO;
import com.chibbol.wtz.domain.room.dto.RoomDTO;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

@Slf4j
@RequiredArgsConstructor
@Component
public class WebSocketHandler extends TextWebSocketHandler {
    private final ObjectMapper objectMapper;
    private final RoomService roomService;

    // 클라이언트 연결
    @Override
    public void afterConnectionEstablished(WebSocketSession session) throws Exception{
    }

    @Override
    protected void handleTextMessage(WebSocketSession session, TextMessage message) throws Exception{
        String payload = message.getPayload(); // 클라이언트로부터 수신된 텍스트 메시지 처리
        log.info("Received message", payload);

        session.sendMessage(new TextMessage("Hello from the server")); // 클라이언트에게 응답 메시지 전송

        ChatMessageDTO chatMessage = objectMapper.readValue(payload, ChatMessageDTO.class);
        log.info("[메세지] "+String.valueOf(chatMessage.getMessage()));
        log.info("[방ID] "+chatMessage.getRoomId());
        RoomDTO roomDTO = roomService.findRoomById(chatMessage.getRoomId());

        roomDTO.handlerActions(session, chatMessage, roomService);
    }

    // 연결 종료
    @Override
    public void afterConnectionClosed(WebSocketSession session, CloseStatus status) throws Exception{

    }
}
