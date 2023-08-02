package com.chibbol.wtz.domain.chat.dto;

import lombok.*;
import org.springframework.web.socket.WebSocketSession;

import java.util.HashSet;
import java.util.Set;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ChatRoomDTO {

    private String code;
    private String title;
    private Set<WebSocketSession> sessions = new HashSet<>();  //WebSocketSession은 Spring에서 Websocket Connection이 맺어진 세션
}
