package com.chibbol.wtz.domain.room.controller;

import com.chibbol.wtz.domain.room.dto.CreateRoomDTO;
import com.chibbol.wtz.domain.room.service.RoomService;
import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/rooms")
@Log4j2
public class RoomController {
    private final RoomService chatRoomService;

    @Operation(summary = "1. 게임방 개설")
    @PostMapping()
    public ResponseEntity<String> createRoom(@RequestBody CreateRoomDTO createRoomDTO){
        log.info("# 채팅방 개설 : " + createRoomDTO.getTitle());
        String code = chatRoomService.createChatRoomDTO(createRoomDTO);
        log.info("# roomCode : " + code);
        return ResponseEntity.ok(code);
    }

    @Operation(summary = "2. 게임방 목록 조회")
    @GetMapping()
    public ResponseEntity<List> getAllRooms(){
        log.info("# 모든 채팅 방");
        return ResponseEntity.ok(chatRoomService.findAllRooms());
    }

    @Operation(summary = "3. 게임방 코드 검색")
    @PostMapping("/search")
    public ResponseEntity<Void> getRoom(@RequestBody String code){
        log.info("# 채팅방 조회, code : " + code);
        chatRoomService.findRoomById(code);
        return ResponseEntity.ok().build();
    }

}
