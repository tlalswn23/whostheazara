package com.chibbol.wtz.domain.job.repository;

import com.chibbol.wtz.domain.job.entity.UserAbilityLog;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserAbilityLogRepository extends JpaRepository<UserAbilityLog, Long> {
}
