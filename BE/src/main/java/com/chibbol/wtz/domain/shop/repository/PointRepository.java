package com.chibbol.wtz.domain.shop.repository;

import com.chibbol.wtz.domain.shop.entity.Point;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface PointRepository extends JpaRepository<Point, Long> {

    Optional<Point> findByUserUserSeq(Long userSeq);
}
