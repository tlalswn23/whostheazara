package com.chibbol.wtz.domain.chat.repository;

import com.chibbol.wtz.domain.chat.entity.RoomUser;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RoomUserRepository extends JpaRepository<RoomUser, Long> {
    List<RoomUser> findAllByRoomRoomSeq(Long roomSeq);
}
