package com.chibbol.wtz.domain.room.service;

import com.chibbol.wtz.domain.room.dto.CreateRoomDTO;
import com.chibbol.wtz.domain.room.dto.RoomListDTO;
import com.chibbol.wtz.domain.room.entity.Room;
import com.chibbol.wtz.domain.room.exception.RoomNotFoundException;
import com.chibbol.wtz.domain.room.repository.RoomEnterRedisRepository;
import com.chibbol.wtz.domain.room.repository.RoomJobSettingRedisRepository;
import com.chibbol.wtz.domain.room.repository.RoomRepository;
import com.chibbol.wtz.domain.user.entity.User;
import com.chibbol.wtz.domain.user.exception.UserNotFoundException;
import com.chibbol.wtz.domain.user.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class RoomService {

    private final RoomRepository roomRepository;
    private final RoomJobSettingRedisRepository roomJobSettingRedisRepository;
    private final RoomEnterRedisRepository roomEnterRedisRepository;

    private final UserService userService;
    private RedisTemplate<String, String> stompRedisTemplate;

    public List<RoomListDTO> findAllRooms() {
        // 채팅방 생성 순서 최근순으로 (채팅방이 존재하는 경우: endAt이 null이 아닌 경우)
        List<Room> roomList = roomRepository.findAllByEndAtIsNullOrderByStartAt().orElse(new ArrayList<>());
        List<RoomListDTO> list = new ArrayList<>();
        for (Room room : roomList) {
            list.add(RoomListDTO.builder()
                            .curUserNum(roomEnterRedisRepository.getUsingSeats(room.getCode()))
                            .maxUserNum(room.getMaxUserNum())
                            .title(room.getTitle())
                            .roomCode(room.getCode())
                        .build()
            );
        }
        return list;
    }

    public String createChatRoomDTO(CreateRoomDTO createRoomDTO) {

        // 코드 생성
        String roomCode = UUID.randomUUID().toString().replaceAll("-", "").substring(0,6);
        createRoomDTO.setRoomCode(roomCode);

        // 방장 정보 확인
        User user = userService.getLoginUser();
        if(user == null){
            throw new UserNotFoundException("사용자를 찾을 수 없습니다");
        }
        createRoomDTO.setOwnerSeq(user.getUserSeq());

        // db에 room 정보 저장
        roomRepository.save(Room.builder()
                .code(roomCode)
                .title(createRoomDTO.getTitle())
                .maxUserNum(createRoomDTO.getMaxUserNum())
                .owner(user)
                .build());
        Room room = roomRepository.findByCode(roomCode);

        // redis에 저장
//        HashOperations<String, Object, Object> hashOperations = stompRedisTemplate.opsForHash();
//        String hashKey = "ROOM";
//        hashOperations.put(hashKey, roomCode, createRoomDTO);


        // redis에 jobSetting 저장
        roomJobSettingRedisRepository.
        for(String key : createRoomDTO.getJobSetting().keySet()){
            // 직업 활성화 껐을때
            if(!createRoomDTO.getJobSetting().get(key)){
                System.out.println(key);
                roomJobSettingRedisRepository.addExcludeJobSeq(room.getCode(), Long.parseLong(key));
            }
        }

        // CurrentSeatsDTO redis에 저장
        roomEnterRedisRepository.createCurrentSeat(roomCode, createRoomDTO.getMaxUserNum());

        return roomCode;
    }


    public Room findRoomByCode(String code) {
        Room room = roomRepository.findByCode(code);
        if(room == null){
            throw new RoomNotFoundException("방을 찾을 수 없습니다");
        }
        return room;
    }
}
