package com.chibbol.wtz.domain.room.controller;

import com.chibbol.wtz.domain.room.dto.ChatRoomDTO;
import com.chibbol.wtz.domain.room.dto.RoomCreateDTO;
import com.chibbol.wtz.domain.room.entity.Room;
import com.chibbol.wtz.domain.room.service.ChatRoomService;
import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/rooms")
@Log4j2
public class RoomController {
    private final ChatRoomService chatRoomService;

    @Operation(summary = "1. 채팅방 목록 조회")
    @GetMapping("/")
    public ResponseEntity<?> getAllRooms(){
        log.info("# 모든 채팅 방");
        return ResponseEntity.ok(chatRoomService.findAllRooms());
    }

    @Operation(summary = "2. 채팅방 개설")
    @PostMapping("/")
    public ResponseEntity<String> createRoom(@RequestBody RoomCreateDTO roomCreateDTO){

        log.info("# 채팅방 개설 : " + roomCreateDTO.getRoomName());
        String roomId = chatRoomService.createChatRoomDTO(roomCreateDTO);
//        log.info("# roomId : " + roomDTO.getRoomId());
        return ResponseEntity.ok(roomId);
    }

    @Operation(summary = "3. 채팅방 검색")
    @GetMapping(value = "/{roomId}")
    public ResponseEntity<Room> getRoom(@PathVariable String roomId){
        log.info("# 채팅방 조회, roomId : " + roomId);
        Room room = chatRoomService.findRoomById(roomId); // Todo: DTO로 필요한 정보 분리
        return ResponseEntity.ok(room);
    }


    // 채팅방 목록 조회
//    @GetMapping(value = "/rooms")
//    public ModelAndView rooms() {
//        log.info("# 모든 채팅 방");
//        ModelAndView mv = new ModelAndView("chat/rooms");
//        mv.addObject("list", repository.findAllRooms());
//        return mv;
//    }


    // 채팅방 개설
//    @PostMapping(value = "/room")
//    public String create(@RequestParam String name, RedirectAttributes rttr) {
//        log.info("# 채팅방 개설 : " +name);
//        rttr.addFlashAttribute("roomName", repository.createChatRoomDTO(name));
//        return "redirect:/chat/rooms";
//    }

//    // 채팅방 조회
//    @GetMapping("/room")
//    public void getRoom(String roomId, Model model) {
//        log.info("# 채팅방 조회, roomId : " + roomId);
//        model.addAttribute("room", repository.findRoomById(roomId));
//    }
}
