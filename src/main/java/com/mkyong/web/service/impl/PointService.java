package com.mkyong.web.service.impl;

import com.mkyong.web.entity.Point;
import com.mkyong.web.repository.PointRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
public class PointService{
    @Autowired
    PointRepository pointRepository;

    public void delete(Point point){
        pointRepository.delete(point);
    }

    public Point save(Point point){
       return pointRepository.save(point);
    }

    public List<Point> getAllPoints(){
        return pointRepository.findAll();
    }

}
