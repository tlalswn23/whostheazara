package com.chibbol.wtz.domain.room.service;

import com.chibbol.wtz.domain.room.dto.RoomCreateDTO;
import com.chibbol.wtz.domain.room.entity.Room;
import com.chibbol.wtz.domain.room.exception.RoomNotFoundException;
import com.chibbol.wtz.domain.room.repository.ChatRoomRepository;
import com.chibbol.wtz.domain.user.entity.User;
import com.chibbol.wtz.domain.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class ChatRoomService {

    private final ChatRoomRepository chatRoomRepository;
    private final UserRepository userRepository;

    public List<Room> findAllRooms() {
        // 채팅방 생성 순서 최근순으로 (채팅방이 존재하는 경우: endAt이 null이 아닌 경우)
        return chatRoomRepository.findAllEndAtIsNullOrderByStartAt();
    }

    public String createChatRoomDTO(RoomCreateDTO roomCreateDTO) {
        String roomId = UUID.randomUUID().toString().replaceAll("-", "").substring(0,10);
        User user = userRepository.findByUserSeq(roomCreateDTO.getUserSeq());
        // return 값 추가
        Room room = Room.builder().roomName(roomCreateDTO.getRoomName()).owner(user).roomId(roomId).build();
        chatRoomRepository.save(room);
        return room.getRoomId();
    }


    public Room findRoomById(String id) {
        Room room = chatRoomRepository.findByRoomId(id);
        if(room == null){
            throw new RoomNotFoundException("방을 찾을 수 없습니다");
        }
        return room;
    }
}
