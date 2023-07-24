package com.chibbol.wtz.global.redis.repository;

import com.chibbol.wtz.global.email.entity.VerificationCode;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface EmailCodeRedisRepository extends CrudRepository<VerificationCode, String> {

}
