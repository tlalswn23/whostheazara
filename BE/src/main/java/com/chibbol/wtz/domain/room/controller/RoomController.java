package com.chibbol.wtz.domain.room.controller;

import com.chibbol.wtz.domain.room.service.RoomService;
import com.chibbol.wtz.domain.room.dto.RoomDTO;
import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequiredArgsConstructor
@RestController
@RequestMapping("/room")
public class RoomController {
    private final RoomService roomService;

    @Operation(summary = "방 만들기")
    @PostMapping("/create")
    public RoomDTO createRoom(@RequestBody String title){
        return roomService.createRoom(title);
    }

    @Operation(summary = "방 리스트 조회")
    @GetMapping("/list")
    public List<RoomDTO> findAllRoom() {
        return roomService.findAllRoom();
    }
}
