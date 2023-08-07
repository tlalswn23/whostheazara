package com.chibbol.wtz.domain.room.service;

import com.chibbol.wtz.domain.room.dto.ChatMessageDTO;
import com.chibbol.wtz.domain.room.dto.CurrentSeatsDTO;
import com.chibbol.wtz.domain.room.entity.Room;
import com.chibbol.wtz.domain.room.repository.RoomRepository;
import com.chibbol.wtz.domain.user.entity.User;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Slf4j
@Service
public class StompService {

    private RoomRepository roomRepository;

    /**
     *  destination에서 roomCode 추출
     */
    public String getRoomCode(String destination) {
        log.info("getRoomCode 실행");
        log.info("destination"+destination);
        int lastIndex = destination.lastIndexOf('/');

        if (lastIndex != -1) {
            return destination.substring(lastIndex + 1);
        }
        return destination;
    }


    public void sendLeaveMessage(ChatMessageDTO chatMessageDTO) {

    }

    public CurrentSeatsDTO setCurrentSeats(User user, String roomCode) {
        CurrentSeatsDTO currentSeatsDTO = new CurrentSeatsDTO();
        User owner = roomRepository.findByRoomCode(roomCode).getOwner();
        // 방장이 들어오면, 1번으로 currentSeats 생성
        if (user.getUserSeq() == owner.getUserSeq()) {

        }
        // 그다음 번호로 redis에 저장
    }
}
