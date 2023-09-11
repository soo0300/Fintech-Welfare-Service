package com.dream.backend.controller.user;

import com.dream.backend.controller.ApiResponse;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class TestController {

    @GetMapping("/hello")
    public String hello() {
        return "Hello, World!";
    }

    @GetMapping("/register")
    public Long joinUser(){
//        JoinUserDto dto = request.toDto();
//         Long id = userService.joinUser(dto);
//        return ApiResponse.ok(1L);
        return 1L;
    }

}
