package com.dream.backend.controller.user;

import com.dream.backend.controller.ApiResponse;
import com.dream.backend.controller.user.request.JoinUserRequest;
import com.dream.backend.service.user.UserService;
import com.dream.backend.service.user.dto.JoinUserDto;
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
    private final UserService userService;

    @PostMapping("/register")
    public ApiResponse<Long> joinUser(JoinUserRequest request){
        JoinUserDto dto = request.toDto();
         Long id = userService.joinUser(dto);
        return ApiResponse.ok(id);

    }
}
