package com.mkyong.web.entity;

import com.fasterxml.jackson.annotation.JsonView;
import com.mkyong.web.jsonview.Views;
import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;
import java.io.Serializable;

@Entity
@Table(name = "point")
public class Point implements Serializable{
    private static final long serialVersionUID = 1L;
    @Id
    @GeneratedValue(generator = "increment")
    @GenericGenerator(name= "increment", strategy= "increment")
    @Column(name = "id", length = 6, nullable = false)
    @JsonView(Views.Public.class)
    private int id;

    @Column(name = "x")
    @JsonView(Views.Public.class)
    private double x;

    @Column(name = "y")
    @JsonView(Views.Public.class)
    private double y;

    @Column(name = "radius")
    @JsonView(Views.Public.class)
    private double radius;

    @Column(name = "area")
    @JsonView(Views.Public.class)
    private boolean area;

    @Transient
    @JsonView(Views.Public.class)
    String token;
    public Point() {
    }

    public Point (int id, double x, double y, double radius, boolean area) {
        this.id = id;
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.area = area;
    }

    public static boolean enter(double x, double y, double radius) {
        return (x <= 0 && x >= -radius && y <= 0 && y >= -radius / 2 ||
                x <= 0 && x >= -radius && y >= 0 && y <= radius && (Math.pow(x, 2) + Math.pow(y, 2)) <= Math.pow(radius, 2) ||
                x >= 0 && x <= radius / 2 && y >= -radius && y <= 0 && (2 * x - y) <= radius);
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id =id;
    }

    public double getX() {
        return x;
    }

    public void setX(double x) {
        this.x = x;
    }

    public double getY() {
        return y;
    }

    public void setY(double y) {
        this.y = y;
    }

    public boolean getArea() {
        return area;
    }

    public void setArea(boolean area) {
        this.area = area;
    }

    public double getRadius() {
        return radius;
    }

    public void setRadius(double radius) {
        this.radius = radius;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }
}

