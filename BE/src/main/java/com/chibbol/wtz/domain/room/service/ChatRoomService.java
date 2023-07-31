package com.chibbol.wtz.domain.room.service;

import com.chibbol.wtz.domain.room.dto.ChatRoomDTO;
import com.chibbol.wtz.domain.room.dto.RoomCreateDTO;
import com.chibbol.wtz.domain.room.entity.Room;
import com.chibbol.wtz.domain.room.exception.RoomNotFoundException;
import com.chibbol.wtz.domain.room.repository.ChatRoomRepository;
import com.chibbol.wtz.domain.user.entity.User;
import com.chibbol.wtz.domain.user.exception.UserNotFoundException;
import com.chibbol.wtz.domain.user.repository.UserRepository;
import com.chibbol.wtz.domain.user.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Repository;
import org.springframework.stereotype.Service;

import javax.annotation.PostConstruct;
import java.util.*;

@Service
@RequiredArgsConstructor
public class ChatRoomService {

    private final UserService userService;

    private final ChatRoomRepository chatRoomRepository;
    private final UserRepository userRepository;

    public List<Room> findAllRooms() {
        // 채팅방 생성 순서 최근순으로 (채팅방이 존재하는 경우: endAt이 null인 경우)
        return chatRoomRepository.findAllEndAtIsNullOrderByStartAt().orElse(new ArrayList<>());
    }

    public String createChatRoomDTO(RoomCreateDTO roomCreateDTO) {
        String roomId = UUID.randomUUID().toString().replaceAll("-", "").substring(0,10);
        User user = userService.getLoginUser();
        if (user == null) {
            throw new UserNotFoundException("존재하지 않은 유저입니다");
        }
        Room room = Room.builder()
                .roomName(roomCreateDTO.getRoomName())
                .owner(user)
                .roomId(roomId)
                .build();
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
