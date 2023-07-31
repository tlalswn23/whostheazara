package com.chibbol.wtz.domain.room.repository;

import com.chibbol.wtz.domain.room.entity.Room;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RoomRepository extends JpaRepository<Room, Long> {
    Room findByRoomSeq(Long roomSeq);
}
