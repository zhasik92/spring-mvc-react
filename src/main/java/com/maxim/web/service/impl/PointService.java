package com.maxim.web.service.impl;

import com.maxim.web.entity.Point;
import com.maxim.web.repository.PointRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
public class PointService{
    @Autowired
    private PointRepository pointRepository;

    public void delete(Point point){
        pointRepository.delete(point);
    }

    public Point save(Point point){
        point.setArea(hitArea(point.getX(),point.getY(),point.getRadius()));
       return pointRepository.save(point);
    }
    private boolean hitArea(double x, double y, double radius) {
        return (x <= 0 && x >= -radius && y <= 0 && y >= -radius / 2 ||
                x <= 0 && x >= -radius && y >= 0 && y <= radius && (Math.pow(x, 2) + Math.pow(y, 2)) <= Math.pow(radius, 2) ||
                x >= 0 && x <= radius / 2 && y >= -radius && y <= 0 && (2 * x - y) <= radius);
    }

    public List<Point> getAllPoints(){
        return pointRepository.findAll();
    }

    public void removeAll(){
        pointRepository.deleteAll();
    }

}
