package com.chibbol.wtz.domain.room.repository;

import com.chibbol.wtz.domain.room.entity.Room;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ChatRoomRepository extends JpaRepository<Room, Long> {

    List<Room> findAllEndAtIsNullOrderByStartAt();

    Room findByRoomId(String id);
}
