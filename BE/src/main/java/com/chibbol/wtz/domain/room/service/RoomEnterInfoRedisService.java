package com.chibbol.wtz.domain.room.service;

import com.chibbol.wtz.domain.room.dto.CurrentSeatsDTO;
import com.chibbol.wtz.domain.room.exception.SeatNotFoundException;
import com.chibbol.wtz.domain.room.repository.RoomEnterRedisRepository;
import com.chibbol.wtz.domain.user.entity.User;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@RequiredArgsConstructor
@Service
public class RoomEnterInfoRedisService {
    private final RoomEnterRedisRepository roomEnterRedisRepository;

    public void createCurrentSeat(String roomCode, int maxUserNum) {
        roomEnterRedisRepository.createCurrentSeat(roomCode, maxUserNum);
    }

    public CurrentSeatsDTO enterUser(String roomCode, User user) {
        CurrentSeatsDTO currentSeatsDTO = roomEnterRedisRepository.enterUser(roomCode, user);
        if (currentSeatsDTO == null) {
            throw new SeatNotFoundException("빈 자리가 없습니다!");
        }
        return currentSeatsDTO;
    }

    public void setUserExitInfo(String roomCode, Long userSeq) {
        roomEnterRedisRepository.setUserExitInfo(roomCode, userSeq);
    }


    public boolean increaseUserCount(String roomCode) {
        return roomEnterRedisRepository.increaseUserCount(roomCode);
    }

    public boolean decreaseUserCount(String roomCode) {
        return roomEnterRedisRepository.decreaseUserCount(roomCode);
    }

    public int getMaxUserNum(String roomCode) {
        return roomEnterRedisRepository.getMaxUserNum(roomCode);
    }

    public List<CurrentSeatsDTO> getUserEnterInfo(String roomCode) {
        return roomEnterRedisRepository.getUserEnterInfo(roomCode);
    }

    public int getUsingSeats(String roomCode) {
        return roomEnterRedisRepository.getUsingSeats(roomCode);
    }

    public List<CurrentSeatsDTO> toCurrentSeatsDTO(List<Object> jsonList) {
        return roomEnterRedisRepository.toCurrentSeatsDTO(jsonList);
    }
}
