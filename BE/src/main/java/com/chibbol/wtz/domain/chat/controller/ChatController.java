package com.chibbol.wtz.domain.chat.controller;

import com.chibbol.wtz.domain.chat.dto.CreateRoomDTO;
import com.chibbol.wtz.domain.chat.entity.Room;
import com.chibbol.wtz.domain.chat.service.RoomService;
import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/rooms")
@Log4j2
public class ChatController {
    private final RoomService roomService;

    @Operation(summary = "1. 채팅방 개설")
    @PostMapping()
    public ResponseEntity<String> createRoom(@RequestBody CreateRoomDTO createRoomDTO){
//        log.info("# 채팅방 개설 : " + createRoomDTO.getRoomSeq());
        String code = roomService.createChatRoomDTO(createRoomDTO);
//        log.info("# roomId : " + roomDTO.getRoomId());
        return ResponseEntity.ok(code);
    }

    @Operation(summary = "2. 채팅방 목록 조회")
    @GetMapping()
    public ResponseEntity<?> getAllRooms(){
        log.info("# 모든 채팅 방");
        return ResponseEntity.ok(roomService.findAllRooms());
    }

    @Operation(summary = "3. 채팅방 검색")
    @PostMapping(value = "/search")
    public ResponseEntity<Room> getRoom(@RequestBody String code){
        log.info("# 채팅방 조회, roomCode : " + code);
        Room room = roomService.findRoomByCode(code);
        return ResponseEntity.ok(room);
    }
}
