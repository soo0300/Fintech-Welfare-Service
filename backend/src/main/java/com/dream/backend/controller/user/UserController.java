package com.dream.backend.controller.user;

import com.dream.backend.controller.ApiResponse;
import com.dream.backend.controller.user.request.JoinUserRequest;
import com.dream.backend.controller.user.response.UserFundResponse;
import com.dream.backend.domain.user.User;
import com.dream.backend.service.user.UserService;
import com.dream.backend.service.user.dto.JoinUserDto;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.Optional;

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

//    @GetMapping("/all/{user_id}")
//    public ApiResponse<UserResponse> getUserInfo(@PathVariable Long user_id) {
//        User user = userService.getUserInfo(user_id);
//        UserResponse userResponse = user.toResponse(user);
//        return ApiResponse.ok(userResponse);
//    }

    @GetMapping("/fund/{user_id}")
    public ApiResponse<UserFundResponse> getUserFund(@PathVariable Long user_id) {
        Optional<User> user = userService.getUserFund(user_id);
        UserFundResponse userResponse = user.get().toFundResponse(user);
        return ApiResponse.ok(userResponse);
    }


}
