package com.chibbol.wtz.domain.room.service;

import com.chibbol.wtz.domain.room.dto.RoomDTO;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;

import javax.annotation.PostConstruct;
import java.io.IOException;
import java.util.*;


@Slf4j
@RequiredArgsConstructor
@Service
public class RoomService {
    private final ObjectMapper objectMapper;
    private Map<String, RoomDTO> chatRooms;

    @PostConstruct
    private void init(){
        chatRooms = new LinkedHashMap<>();
    }

    // 모든 룸 리스트 가져오기
    public List<RoomDTO> findAllRoom(){
        return new ArrayList<>(chatRooms.values());
    }

    public RoomDTO findRoomById(String roomId){
        return chatRooms.get(roomId);
    }

    public RoomDTO createRoom(String title){
        String randomId = UUID.randomUUID().toString(); // 고유 식별자 생성
        // ChatRoom 객체 생성
        String roomTitle = title.replaceAll("\\\"",""); // 방 이름에서 따옴표 제거
        RoomDTO roomDTO = RoomDTO.builder()
                .roomId(randomId)
                .title(roomTitle)
                .build();
        chatRooms.put(randomId, roomDTO);

        log.info(String.valueOf("[방이름] "+ roomDTO.getTitle()));
        log.info(String.valueOf(chatRooms.size()));
        return roomDTO;
    }

    public <T> void sendMessage(WebSocketSession session, T message){
        try{
            // TALK 상태일 경우 실행되는 메서드, 메세지를 해당 채팅방의 webSocket 세션에 보냄
            session.sendMessage(new TextMessage(objectMapper.writeValueAsString(message)));
        }catch(IOException e){
            log.error(e.getMessage(), e);
        }
    }
}
