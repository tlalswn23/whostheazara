package com.chibbol.wtz.domain.room.repository;

import com.chibbol.wtz.domain.room.entity.Room;
import io.swagger.v3.oas.annotations.Operation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ChatRoomRepository extends JpaRepository<Room, Long> {

    Optional<List<Room>> findAllEndAtIsNullOrderByStartAt();

    Room findByRoomId(String id);
}
