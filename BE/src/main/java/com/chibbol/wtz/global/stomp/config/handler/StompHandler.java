//package com.chibbol.wtz.global.stomp.config.handler;
//
//import com.chibbol.wtz.global.security.service.TokenService;
//import lombok.RequiredArgsConstructor;
//import org.springframework.messaging.Message;
//import org.springframework.messaging.MessageChannel;
//import org.springframework.messaging.simp.stomp.StompCommand;
//import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
//import org.springframework.messaging.support.ChannelInterceptor;
//import org.springframework.stereotype.Component;
//
//@RequiredArgsConstructor
//@Component
//public class StompHandler implements ChannelInterceptor {
//
//    private final TokenService tokenService;
//
//    // websocket을 통해 들어온 요청이 처리 되기전 실행
//    // 유효하지 않은 토큰이 세팅될 경우, websocket을 통해 보낸 메세지는 무시
//    @Override
//    public Message<?> preSend(Message<?> message, MessageChannel messageChannel) {
//        StompHeaderAccessor stompHeaderAccessor = StompHeaderAccessor.wrap(message);
//
//        // websocket 연결시 헤더의 jwt token 검증
//        if (StompCommand.CONNECT == stompHeaderAccessor.getCommand()) {
//            tokenService.verifyToken(stompHeaderAccessor.getFirstNativeHeader("Authorization"));
//        }
//        return message;
//    }
//}
