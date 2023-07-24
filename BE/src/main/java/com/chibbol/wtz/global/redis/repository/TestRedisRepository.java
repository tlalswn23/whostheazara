package com.chibbol.wtz.global.redis.repository;

import com.chibbol.wtz.global.redis.entity.Test;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TestRedisRepository extends CrudRepository<Test, Long> {
}
