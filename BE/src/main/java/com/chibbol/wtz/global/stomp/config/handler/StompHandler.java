package com.chibbol.wtz.global.stomp.config.handler;

import com.chibbol.wtz.domain.chat.dto.ChatMessageDTO;
import com.chibbol.wtz.domain.chat.repository.StompChatRoomRedisRepository;
import com.chibbol.wtz.domain.chat.service.StompChatService;
import com.chibbol.wtz.global.security.service.TokenService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.messaging.Message;
import org.springframework.messaging.MessageChannel;
import org.springframework.messaging.simp.stomp.StompCommand;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.messaging.support.ChannelInterceptor;
import org.springframework.stereotype.Component;

import java.security.Principal;
import java.util.List;
import java.util.Optional;

@Slf4j
@RequiredArgsConstructor
@Component
public class StompHandler implements ChannelInterceptor {

    private final TokenService tokenService;
    private final StompChatService stompChatService;

    private final StompChatRoomRedisRepository stompChatRoomRedisRepository;

    // websocket을 통해 들어온 요청이 처리 되기전 실행
    // 유효하지 않은 토큰이 세팅될 경우, websocket을 통해 보낸 메세지는 무시
    @Override
    public Message<?> preSend(Message<?> message, MessageChannel messageChannel) {
        StompHeaderAccessor stompHeaderAccessor = StompHeaderAccessor.wrap(message);

        // CONNECT할때, 헤더의 jwt token 검증
        if (StompCommand.CONNECT == stompHeaderAccessor.getCommand()) {
            List<String> tokens = stompHeaderAccessor.getNativeHeader("Authorization");
            log.info("tokens : ", tokens);
            String token = tokens.get(0).substring(7);
            log.info("token : ", token);
            tokenService.verifyToken(token);
        }

        // SUBSCRIBE할때, 유저 관리
        else if (StompCommand.SUBSCRIBE == stompHeaderAccessor.getCommand()) {
            // room code 추출
            String roomCode = stompChatService.getRoomCode(Optional.ofNullable((String) message.getHeaders().get("simpDestination")).orElse("InvalidRoomId"));
            // sessionId 추출
            String sessionId = (String) message.getHeaders().get("simpSessionId");
            // 특정 세션이 어떤 채팅방에 들어가 있는지 알기 위해 저장
            stompChatRoomRedisRepository.setUserEnterInfo(sessionId, roomCode);
            // 채팅방 인원수 +1
            stompChatRoomRedisRepository.plusUserCount(roomCode);
            // 클라이언트 입장 메세지를 채팅방에 발송
            String name = Optional.ofNullable((Principal) message.getHeaders().get("simpUser")).map(Principal::getName).orElse("UnknownUser");
//            log.info("SUBSCRIBED {}, {}", name, roomCode);
            stompChatService.enterChatRoom(roomCode);
        }

        else if (StompCommand.UNSUBSCRIBE == stompHeaderAccessor.getCommand()) {

        }

        else if (StompCommand.DISCONNECT == stompHeaderAccessor.getCommand()) {
            // sessionId 추출
            String sessionId = (String) message.getHeaders().get("simpSessionId");
            // 세션이 있는 roomId 추출
            String roomCode = stompChatRoomRedisRepository.getUserEnterRoomId(sessionId);
            // 채팅방 인원수 -1
            stompChatRoomRedisRepository.minusUserCount(roomCode);
            //
            String name = Optional.ofNullable((Principal) message.getHeaders().get("simpUser")).map(Principal::getName).orElse("Unknown");
            stompChatService.sendLeaveMessage(ChatMessageDTO.builder().code(roomCode).userName(name).build());
            // 퇴장한 sessionId 삭제
            stompChatRoomRedisRepository.removeUserEnterInfo(sessionId);
            log.info("DISCONNECTED {}, {}", sessionId, roomCode);
        }
        return message;
    }
}
