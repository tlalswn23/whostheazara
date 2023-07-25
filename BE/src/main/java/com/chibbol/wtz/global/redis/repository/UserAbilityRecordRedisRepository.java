package com.chibbol.wtz.global.redis.repository;

import com.chibbol.wtz.domain.job.entity.UserAbilityRecord;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class UserAbilityRecordRedisRepository {

    Map<Long, Map<Long, List<UserAbilityRecord>>> userAbilityRecordMap = new HashMap<>();

    public void save(UserAbilityRecord userAbilityRecord) {
        if(!userAbilityRecordMap.containsKey(userAbilityRecord.getRoomSeq())) {
            userAbilityRecordMap.put(userAbilityRecord.getRoomSeq(), new HashMap<>());
            userAbilityRecordMap.get(userAbilityRecord.getRoomSeq()).put(userAbilityRecord.getTurn(), new ArrayList<>());
            userAbilityRecordMap.get(userAbilityRecord.getRoomSeq()).get(userAbilityRecord.getTurn()).add(userAbilityRecord);
        } else if(!userAbilityRecordMap.get(userAbilityRecord.getRoomSeq()).containsKey(userAbilityRecord.getTurn())) {
            userAbilityRecordMap.get(userAbilityRecord.getRoomSeq()).put(userAbilityRecord.getTurn(), new ArrayList<>());
            userAbilityRecordMap.get(userAbilityRecord.getRoomSeq()).get(userAbilityRecord.getTurn()).add(userAbilityRecord);
        } else {
            userAbilityRecordMap.get(userAbilityRecord.getRoomSeq()).get(userAbilityRecord.getTurn()).add(userAbilityRecord);
        }
    }

    public List<UserAbilityRecord> findAllByRoomSeqAndTurn(Long roomSeq, Long turn) {
        if(!userAbilityRecordMap.containsKey(roomSeq)) {
            System.out.println("no roomSeq = " + roomSeq);
            return new ArrayList<>();
        }
        if(!userAbilityRecordMap.get(roomSeq).containsKey(turn)) {
            System.out.println("no turn = " + turn);
            return new ArrayList<>();
        }
        return userAbilityRecordMap.get(roomSeq).get(turn);
    }

    public void saveAll(List<UserAbilityRecord> userAbilityRecords, UserAbilityRecordRedisRepository userAbilityRecordRedisRepository) {
        userAbilityRecords.forEach(userAbilityRecordRedisRepository::save);
    }
}
