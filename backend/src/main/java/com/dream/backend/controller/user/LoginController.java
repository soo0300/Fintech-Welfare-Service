package com.dream.backend.controller.user;

import com.dream.backend.controller.ApiResponse;
import com.dream.backend.service.user.LoginService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping
public class LoginController {

    private final LoginService loginService;

    @GetMapping("/login/{user_email}/{user_pwd}")
    public ApiResponse<Long> login(@PathVariable String user_email, @PathVariable String user_pwd){
        Long id = loginService.loginUser(user_email,user_pwd);
        return ApiResponse.ok(id);
    }

}
