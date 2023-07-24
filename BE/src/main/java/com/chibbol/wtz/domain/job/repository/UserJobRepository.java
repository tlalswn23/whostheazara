package com.chibbol.wtz.domain.job.repository;

import com.chibbol.wtz.domain.job.entity.UserJob;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserJobRepository extends JpaRepository<UserJob, Long> {

}
