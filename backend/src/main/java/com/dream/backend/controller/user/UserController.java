package com.dream.backend.controller.user;

import com.dream.backend.controller.ApiResponse;
import com.dream.backend.controller.user.request.JoinUserRequest;
import com.dream.backend.service.user.dto.JoinUserDto;
import com.dream.backend.service.user.userService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@RequiredArgsConstructor
@Controller
@Slf4j
@RequestMapping("/user")
public class UserController {
    userService userService =

    @PostMapping("/register")
    public String joinUser(JoinUserRequest request){
        JoinUserDto dto = request.toDto();
         Long id = userService.joinUser(dto);
        return ApiResponse.ok(id);

    }
}
