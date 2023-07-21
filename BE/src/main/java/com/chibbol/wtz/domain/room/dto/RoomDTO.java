package com.chibbol.wtz.domain.room.dto;

import com.chibbol.wtz.domain.room.Service.RoomService;
import com.fasterxml.jackson.annotation.JsonAutoDetect;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Builder;
import lombok.Getter;
import org.springframework.web.socket.WebSocketSession;

import java.util.HashSet;
import java.util.Set;

@Getter
public class RoomDTO {
    @JsonProperty
    private String roomId;
    @JsonProperty
    private String title;
    @JsonIgnore
    private Set<WebSocketSession> sessions = new HashSet<>();
    @JsonProperty
    private int user_count;

    @Builder // 생성자 대신 객체를 생성 가능
    public RoomDTO(String roomId, String title){
        this.roomId = roomId;
        this.title = title;
    }

    public void handlerActions(WebSocketSession session, ChatMessageDTO chatMessage, RoomService roomService){
        // 메세지의 상태를 확인하여 ENTER이면
        if(chatMessage.getType().equals(ChatMessageDTO.MessageType.ENTER)){
            sessions.add(session); // session을 연결한 뒤에
            user_count++;
            System.out.println(sessions.size());
            // 해당 채팅방에 입장 메세지 보내기
            chatMessage.setMessage(chatMessage.getSender() + "님이 입장했습니다.");
        }
        // 만약 이미 연결된 상태라면(TALK) 해당 메세지를 채팅방에 있는 모든 클라이언트들에게 보냄
        sendMessage(chatMessage, roomService);
    }

    // 메세지를 모든 클라이언트들에게 보냄
    private <T> void sendMessage(T message, RoomService roomService){
        sessions.parallelStream()
                .forEach(session -> roomService.sendMessage(session, message));
    }
}
