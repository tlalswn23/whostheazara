package com.chibbol.wtz.domain.room.repository;

import com.chibbol.wtz.domain.room.dto.ChatRoomDTO;
import org.springframework.stereotype.Repository;

import javax.annotation.PostConstruct;
import java.util.*;

//@Repository
public class ChatRoomRepository {
//
//    private Map<String, ChatRoomDTO> chatRoomDTOMap; // 실제 서비스에서는 db에 저장
//
//    @PostConstruct
//    private void init() {
//        chatRoomDTOMap = new LinkedHashMap<>();
//    }
//
//    public List<ChatRoomDTO> findAllRooms() {
//        // 채팅방 생성 순서 최근순으로
//        List<ChatRoomDTO> result = new ArrayList<>(chatRoomDTOMap.values());
//        Collections.reverse(result);
//        return result;
//    }
//
//    public ChatRoomDTO findRoomById(String id) {
//        return chatRoomDTOMap.get(id);
//    }
//
//    public ChatRoomDTO createChatRoomDTO(String name) {
//        ChatRoomDTO room = ChatRoomDTO.create(name);
//        chatRoomDTOMap.put(room.getRoomId(), room);
//        return room;
//    }
}
