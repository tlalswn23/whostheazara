package com.chibbol.wtz.domain.chat.service;

import com.chibbol.wtz.domain.chat.dto.CreateRoomDTO;
import com.chibbol.wtz.domain.chat.entity.Room;
import com.chibbol.wtz.domain.chat.exception.RoomNotFoundException;
import com.chibbol.wtz.domain.chat.repository.RoomRepository;
import com.chibbol.wtz.domain.user.entity.User;
import com.chibbol.wtz.domain.user.exception.UserNotFoundException;
import com.chibbol.wtz.domain.user.service.UserService;
import com.chibbol.wtz.global.redis.repository.RoomJobSettingRedisRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

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

        // 유저(방장) 정보 확인
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


        // todo : 토픽 생성


        // redis에 jobSetting 저장
        for(String key : createRoomDTO.getJobSetting().keySet()){
            // 직업 활성화 껐을때
            if(createRoomDTO.getJobSetting().get(key)){
                System.out.println(key);
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
