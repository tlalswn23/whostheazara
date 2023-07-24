package com.chibbol.wtz.global.redis.service;

import com.chibbol.wtz.global.redis.entity.Test;
import com.chibbol.wtz.global.redis.repository.TestRedisRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class RedisService {
    private final TestRedisRepository testRedisRepository;

    private long count = 1;

    public void test(String name) {
        testRedisRepository.save(Test.builder().id(count++).name(name).build());
    }

    public void get(Long id) {
        System.out.println(testRedisRepository.findById(id).toString());
    }
}
