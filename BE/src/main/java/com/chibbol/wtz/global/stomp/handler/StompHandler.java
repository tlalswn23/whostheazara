//package com.chibbol.wtz.global.stomp.handler;
//
//import lombok.RequiredArgsConstructor;
//import org.springframework.messaging.Message;
//import org.springframework.messaging.MessageChannel;
//import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
//import org.springframework.messaging.support.ChannelInterceptor;
//import org.springframework.stereotype.Component;
//
//@RequiredArgsConstructor
//@Component
//public class StompHandler implements ChannelInterceptor {
//
//    private final JwtTokenProvider jwtTokenProvider;
//
//    @Override
//    public Message<?> preSend(Message<?> message, MessageChannel messageChannel) {
//        StompHeaderAccessor stompHeaderAccessor = StompHeaderAccessor.wrap(message);
//
//    }
//}
