package com.maxim.web.controller.api;

import com.fasterxml.jackson.annotation.JsonView;
import com.maxim.web.entity.Point;
import com.maxim.web.entity.User;
import com.maxim.web.jsonview.Views;
import com.maxim.web.model.AjaxResponseBody;
import com.maxim.web.service.UserService;
import com.maxim.web.service.impl.PointService;
import com.maxim.web.util.AuthService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.util.UriComponentsBuilder;

import java.util.Collections;
import java.util.List;

@RestController
@RequestMapping("/api")
public class PointController {
    private static final Logger logger = LoggerFactory.getLogger(PointController.class);
    @Value("${jwt.secret}")
    private String key;
    @Autowired
    private UserService userService;
    @Autowired
    private PointService pointService;

    @JsonView(Views.Public.class)
    @RequestMapping(value = "/point", method = RequestMethod.POST)
    public AjaxResponseBody createPoint(@RequestBody Point data, UriComponentsBuilder ucBuilder) {
        logger.info("Creating Point : {}", data);
        AjaxResponseBody result = new AjaxResponseBody();

        AuthService authService = new AuthService(data.getToken(), key);
        if (authService.getUserName() == null) {
            result.setCode("404");
            result.setMsg(authService.getMessage());
            return result;
        }
        //OK, we can trust this JWT
        String userName = authService.getUserName();


        User user = userService.getByUsername(userName);
        Point point = pointService.save(data);


        result.setCode("201");
        result.setMsg(Long.toString(point.getId()));

        return result;
    }
    @JsonView(Views.Public.class)
    @RequestMapping(value = "/points", method = RequestMethod.GET)
    public ResponseEntity<List<Point>> listAllPoints() {
        List<Point> points = pointService.getAllPoints();
        if (points.isEmpty()) {
            return new ResponseEntity(HttpStatus.NO_CONTENT);
         }
        return new ResponseEntity<List<Point>>(points, HttpStatus.OK);
    }
    @JsonView(Views.Public.class)
    @RequestMapping(value = "/remove", method = RequestMethod.POST)
    public ResponseEntity<List<Point>> removeAll() {
        pointService.removeAll();
        return new ResponseEntity<List<Point>>(Collections.emptyList(), HttpStatus.OK);
    }
}
