package com.chibbol.wtz.domain.room.service;

import com.chibbol.wtz.domain.room.dto.CreateRoomDTO;
import com.chibbol.wtz.domain.room.entity.Room;
import com.chibbol.wtz.domain.room.exception.RoomNotFoundException;
import com.chibbol.wtz.domain.room.repository.RoomRepository;
import com.chibbol.wtz.domain.user.entity.User;
import com.chibbol.wtz.domain.user.exception.UserNotFoundException;
import com.chibbol.wtz.domain.user.repository.UserRepository;
import com.chibbol.wtz.domain.user.service.UserService;
import com.chibbol.wtz.global.redis.repository.RoomJobSettingRedisRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.swing.*;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class RoomService {

    private final RoomRepository roomRepository;
    private final RoomJobSettingRedisRepository roomJobSettingRedisRepository;

    private final UserService userService;

    public List<Room> findAllRooms() {
        // 채팅방 생성 순서 최근순으로 (채팅방이 존재하는 경우: endAt이 null이 아닌 경우)
        return roomRepository.findAllByEndAtIsNullOrderByStartAt().orElse(new ArrayList<>());
    }

    public String createChatRoomDTO(CreateRoomDTO createRoomDTO) {

        // 코드 생성
        String code = UUID.randomUUID().toString().replaceAll("-", "").substring(0,10);

        // 유저 정보 확인
        User user = userService.getLoginUser();

        if(user == null){
            throw new UserNotFoundException("사용자를 찾을 수 없습니다");
        }

        // db에 room 정보 저장
        roomRepository.save(Room.builder()
                .code(code)
                .title(createRoomDTO.getTitle())
                .owner(user)
                .build());

        Room room = roomRepository.findByCode(code);

        // redis에 jobSetting 저장
        for(String key : createRoomDTO.getJobSettings().keySet()){
            System.out.println(key);
            if(!createRoomDTO.getJobSettings().get(key)){
                roomJobSettingRedisRepository.addExcludeJobSeq(room.getRoomSeq(), Long.parseLong(key));
            }

        }

        return room.getCode();
    }


    public Room findRoomByCode(String code) {
        Room room = roomRepository.findByCode(code);
        if(room == null){
            throw new RoomNotFoundException("방을 찾을 수 없습니다");
        }
        return room;
    }
}
