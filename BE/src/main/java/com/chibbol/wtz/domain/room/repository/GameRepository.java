package com.chibbol.wtz.domain.room.repository;

import com.chibbol.wtz.domain.room.entity.Game;
import com.chibbol.wtz.domain.room.entity.Room;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface GameRepository extends JpaRepository<Game, Long> {
    Room findRoomByGameCode(String gameCode);
}