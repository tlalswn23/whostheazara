package com.chibbol.wtz.domain.level.repository;

import com.chibbol.wtz.domain.level.entity.UserLevel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserLevelRepository extends JpaRepository<UserLevel, Long> {
    UserLevel findByUserUserSeq(Long user_seq);
}
