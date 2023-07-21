package com.chibbol.wtz.domain.room.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ChatMessageDTO {
    public enum MessageType{
        ENTER, TALK
        // ENTER : 사용자가 처음 채팅방에 들어오는 상태
        // TALK : 사용자가 이미 채팅에 참여중인 상태
    }

    private MessageType type;
    private String roomId;
    private String sender;
    private String message;
}
