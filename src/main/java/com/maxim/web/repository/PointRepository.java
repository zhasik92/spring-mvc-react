package com.maxim.web.repository;

import com.maxim.web.entity.Point;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Set;

public interface PointRepository extends JpaRepository<Point, Integer> {
}
