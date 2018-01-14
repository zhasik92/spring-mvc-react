package com.maxim.web.controller;

import com.maxim.web.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;


@Controller
public class WelcomeController {
	@Autowired
	private UserService userService;

	@RequestMapping(value = { "/*", "/*/*" }, method = RequestMethod.GET)
	public String printWelcome(ModelMap model) {
		System.out.println("go to welcome contoller");
		return "index";
	}

}
