package com.chibbol.wtz.domain.room.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.messaging.simp.config.MessageBrokerRegistry;
import org.springframework.web.socket.config.annotation.*;

@Configuration
@EnableWebSocketMessageBroker // stomp를 사용하기 위해 선언하는 어노테이션
class StompWebSocketConfig implements WebSocketMessageBrokerConfigurer {

    // WebSocket과 STOMP를 사용하는 웹 애플리케이션에서 endpoint는 클라이언트가 서버와 통신하기 위해 사용하는 주소를 나타냅니다.
    // 이 주소를 통해 클라이언트와 서버가 실시간으로 데이터를 교환할 수 있습니다.
    @Override
    public void registerStompEndpoints(StompEndpointRegistry registry) {
        System.out.println("시작");
        registry.addEndpoint("/stomp/chat")
                .setAllowedOriginPatterns("*");
                //.withSockJS();
        System.out.println("끝");
    }

    @Override
    public void configureMessageBroker(MessageBrokerRegistry registry) {
        registry.setApplicationDestinationPrefixes("/pub"); // @MessageMapping으로 연결
        registry.enableSimpleBroker("/sub"); // SimpleBroker를 등록
        // SimpleBroker는 해당하는 경로를 SUBSCRIBE하는 Client에게 메세지를 전달하는 간단한 작업을 수행
    }

}
