package com.dream.backend.controller.user;

import com.dream.backend.controller.ApiResponse;
import com.dream.backend.controller.user.request.JoinUserRequest;
import com.dream.backend.controller.user.response.UserFundResponse;
import com.dream.backend.domain.user.User;
import com.dream.backend.service.user.UserService;
import com.dream.backend.service.user.dto.JoinUserDto;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@Slf4j
@RequiredArgsConstructor
@RequestMapping("/user")
public class UserController {
    private final UserService userService;

    @PostMapping("/register")
    public ApiResponse<Long> joinUser(JoinUserRequest request){
        JoinUserDto dto = request.toDto();
         Long id = userService.joinUser(dto);
        return ApiResponse.ok(1L);
    }

    @GetMapping("/fund/{user_id}")
    public UserFundResponse getUserFund(@PathVariable Long user_id) {
        Optional<User> user = userService.getUserFund(user_id);
        UserFundResponse userResponse = user.get().toFundResponse(user);
        return userResponse;
    }

}
