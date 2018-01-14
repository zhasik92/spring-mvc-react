package com.maxim.web.controller.api;

import com.fasterxml.jackson.annotation.JsonView;
import com.maxim.web.entity.User;
import com.maxim.web.jsonview.Views;
import com.maxim.web.model.LoginModel;
import com.maxim.web.model.LoginResponseBody;
import com.maxim.web.service.UserService;
import com.maxim.web.util.MD5;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.Objects;

@RestController
@RequestMapping("/api")
public class AuthorizationController {
    public static final Logger logger = LoggerFactory.getLogger(AuthorizationController.class);

    @Value("${jwt.secret}")
    private String key;

    @Autowired
    UserService userService; //Service which will do all data retrieval/manipulation work

    @JsonView(Views.Public.class)
    @RequestMapping(value = "/login", method = RequestMethod.POST)
    public ResponseEntity<?> login(@RequestBody LoginModel data) {
        User user = userService.getByUsername(data.getUsername());

        if (user == null) {
            return new ResponseEntity(new LoginResponseBody(false, null, "User with that name isn't exist"),
                    HttpStatus.OK);
        }

        if (!Objects.equals(user.getPassword(), MD5.getHash(data.getPassword()))) {
            return new ResponseEntity(new LoginResponseBody(false, null, "wrong_password"),
                    HttpStatus.OK);
        }

        String token = Jwts.builder()
                .setSubject(data.getUsername())
                .signWith(SignatureAlgorithm.HS512, key)
                .compact();

        return new ResponseEntity(new LoginResponseBody(true, token), HttpStatus.OK);
    }

    @JsonView(Views.Public.class)
    @RequestMapping(value = "/register", method = RequestMethod.POST)
    public ResponseEntity<?> register(@RequestBody LoginModel data) {

        User user = userService.getByUsername(data.getUsername());

        if (user != null) {
            return new ResponseEntity(new LoginResponseBody(false, null, "User with that name has already existed"),
                    HttpStatus.OK);
        }

        User newUser = new User(data.getUsername(), MD5.getHash(data.getPassword()), new Date(), "active", 0);
        userService.addUser(newUser);

        String token = Jwts.builder()
                .setSubject(newUser.getUsername())
                .signWith(SignatureAlgorithm.HS512, key)
                .compact();

        return new ResponseEntity(new LoginResponseBody(true, token), HttpStatus.OK);
    }
}