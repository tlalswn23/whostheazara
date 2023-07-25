package com.chibbol.wtz.domain.job.repository;

import com.chibbol.wtz.domain.job.entity.UserJob;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserJobRepository extends JpaRepository<UserJob, Long> {

    List<UserJob> findAllByRoomRoomSeq(Long roomSeq);

     UserJob findByRoomRoomSeqAndUserUserSeq(Long roomSeq, Long userSeq);
}
