package com.dream.backend.controller.user;

import com.dream.backend.controller.ApiResponse;
import com.dream.backend.controller.user.request.JoinUserRequest;
import com.dream.backend.controller.user.response.UserFundResponse;
import com.dream.backend.controller.user.response.UserResponse;
import com.dream.backend.domain.user.User;
import com.dream.backend.service.user.UserService;
import com.dream.backend.service.user.dto.JoinUserDto;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/user")
public class UserController {
    private final UserService userService;

    @PostMapping("/signup/{type}")
    public ApiResponse<Long> joinUser(@RequestBody JoinUserRequest request, @PathVariable int type) {
        JoinUserDto dto = request.toDto();
        System.out.print("controller region key" + dto.getRegionKey());
        Long id = userService.joinUser(dto, type);
        return ApiResponse.ok(id);
    }

    @GetMapping("/fund/{user_id}")
    public UserFundResponse getUserFund(@PathVariable Long user_id) {
        Optional<User> user = userService.getUserFund(user_id);
        UserFundResponse userResponse = user.get().toFundResponse(user);
        return userResponse;
    }

    @GetMapping("/fund2")
    public UserFundResponse getUserFund() {
        Optional<User> user = userService.getUserFund(1L);
        UserFundResponse userResponse = user.get().toFundResponse(user);
        return userResponse;
    }

    @GetMapping("/{user_id}")
    public UserResponse getUserInfo(@PathVariable Long user_id) {
        UserResponse userResponse = userService.getUserInfo(user_id);
        return userResponse;
    }

    @PatchMapping("/{user_id}/{region_key}")
    public UserResponse changeUserInfo(@PathVariable Long user_id, @PathVariable Long region_key) {
        UserResponse userResponse = userService.changeUserRegion(user_id, region_key);
        return userResponse;
    }

    @PatchMapping("/{user_id}/{pwd}")
    public UserResponse changeUserPwd(@PathVariable Long user_id, @PathVariable String pwd) {
        UserResponse userResponse = userService.changeUserPwd(user_id, pwd);
        return userResponse;
    }





}
