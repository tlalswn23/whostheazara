package com.chibbol.wtz.domain.room.config;

import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.socket.WebSocketHandler;
import org.springframework.web.socket.config.annotation.EnableWebSocket;
import org.springframework.web.socket.config.annotation.WebSocketConfigurer;
import org.springframework.web.socket.config.annotation.WebSocketHandlerRegistry;
@RequiredArgsConstructor
@Configuration
@EnableWebSocket // websocket 활성화 
public class WebSocketConfig implements WebSocketConfigurer {
    private final WebSocketHandler webSocketHandler;
    @Override
    public void registerWebSocketHandlers(WebSocketHandlerRegistry registry) {
        registry.addHandler(webSocketHandler, "/chat-test").setAllowedOrigins("*");
        // 처리할 핸들러와 웹소켓 주소
    }
}
