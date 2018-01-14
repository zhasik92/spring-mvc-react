package com.mkyong.web.entity;

import com.fasterxml.jackson.annotation.JsonView;
import com.mkyong.web.jsonview.Views;
import org.hibernate.annotations.Fetch;
import org.hibernate.annotations.FetchMode;
import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;
import java.util.Date;
import java.util.Set;

@Entity
@Table(name = "userr")
public class User {
    @Id
    @GeneratedValue(generator = "increment")
    @GenericGenerator(name = "increment", strategy = "increment")
    @Column(name = "id", length = 6, nullable = false)
    @JsonView(Views.Public.class)
    private long id;

    @Column(name = "username", length = 64, unique = true)
    @JsonView(Views.Public.class)
    private String username;

    @Column(name = "password")
    private String password;

    @Column(name = "created_at")
    @Temporal(TemporalType.TIMESTAMP)
    @JsonView(Views.Public.class)
    private Date created_at;

    @Column(name = "status")
    @JsonView(Views.Public.class)
    private String status;

    @Column(name = "popular")
    @JsonView(Views.Public.class)
    private Integer popular;

    @PrePersist
    protected void onCreate() {
        created_at = new Date();
    }

    public User() {
    }

    public User(String username, String password, Date created_at, String status, Integer popular) {
        this.username = username;
        this.password = password;
        this.created_at = created_at;
        this.status = status;
        this.popular = popular;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public Date getCreated_at() {
        return created_at;
    }

    public void setCreated_at(Date created_at) {
        this.created_at = created_at;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public Integer getPopular() {
        return popular;
    }

    public void setPopular(Integer popular) {
        this.popular = popular;
    }
}