package com.chibbol.wtz.global.email.repository;

import com.chibbol.wtz.global.email.entity.VerificationCode;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface EmailCodeRedisRepository extends CrudRepository<VerificationCode, String> {

}
