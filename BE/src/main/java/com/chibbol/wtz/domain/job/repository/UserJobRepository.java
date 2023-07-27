package com.chibbol.wtz.domain.job.repository;

import com.chibbol.wtz.domain.job.entity.UserJob;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserJobRepository extends JpaRepository<UserJob, Long> {

    List<UserJob> findAllByRoomRoomSeq(Long roomSeq);

     UserJob findByRoomRoomSeqAndUserUserSeq(Long roomSeq, Long userSeq);

     UserJob findByRoomRoomSeqAndJobJobSeq(Long roomSeq, Long jobSeq);

    boolean existsByRoomRoomSeqAndUserUserSeqAndIsAliveIsTrueAndCanVoteIsTrue(Long roomSeq, Long userSeq);

    @Modifying
    @Query("UPDATE UserJob u SET u.canVote = :canVote WHERE u.room.roomSeq = :roomSeq")
    void updateCanVoteByRoomSeq(Long roomSeq, boolean canVote);
}
