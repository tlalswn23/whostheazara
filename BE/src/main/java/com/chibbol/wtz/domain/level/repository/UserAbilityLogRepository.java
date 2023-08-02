package com.chibbol.wtz.domain.level.repository;

import com.chibbol.wtz.domain.level.entity.UserAbilityLog;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserAbilityLogRepository extends JpaRepository<UserAbilityLog, Long> {

    UserAbilityLog findAllByUserUserSeqAndRoomRoomSeq(Long user_seq, Long roomSeq);

}
