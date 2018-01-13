package com.mkyong.web.repository;

import com.mkyong.web.entity.Point;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PointRepository extends JpaRepository<Point, Integer> {

}
