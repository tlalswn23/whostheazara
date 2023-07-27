package com.chibbol.wtz.domain.room.service;

import com.chibbol.wtz.domain.room.dto.ChatRoomDTO;
import com.chibbol.wtz.domain.room.dto.RoomCreateDTO;
import com.chibbol.wtz.domain.room.entity.Room;
import com.chibbol.wtz.domain.room.repository.ChatRoomRepository;
import com.chibbol.wtz.domain.user.entity.User;
import com.chibbol.wtz.domain.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;
import org.springframework.stereotype.Service;

import javax.annotation.PostConstruct;
import java.util.*;

// 채팅방을 생성하고 정보를 조회
// 테스트 후 DB 사용하도록 저장하도록 고치기
@Service
@RequiredArgsConstructor
public class ChatRoomService {

    private final ChatRoomRepository chatRoomRepository;
    private final UserRepository userRepository;

    public List<Room> findAllRooms() {
        // 채팅방 생성 순서 최근순으로 (채팅방이 존재하는 경우: endAt이 null이 아닌 경우)
        return chatRoomRepository.findAllEndAtIsNullOrderByStartAt();
    }

    public Room findRoomById(String id) {
        return chatRoomRepository.findByRoomId(id);
    }

    public void createChatRoomDTO(RoomCreateDTO roomCreateDTO) {
        String roomId = UUID.randomUUID().toString().replaceAll("-", "").substring(0,10);
        User user = userRepository.findByUserSeq(roomCreateDTO.getUserSeq());
        chatRoomRepository.save(Room.builder().roomName(roomCreateDTO.getRoomName()).owner(user).roomId(roomId).build());
    }
}
