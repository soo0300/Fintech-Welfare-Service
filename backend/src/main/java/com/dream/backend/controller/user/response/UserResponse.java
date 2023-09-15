package com.dream.backend.controller.user.response;

import lombok.Builder;
import lombok.Data;

@Data
public class UserResponse {

    private String name;

    private String email;

    private String password;

    //주민등록번호로 가공된 만 나이
    private int age;

    private Long regionKey;

//    private int account;

    @Builder
    public UserResponse(String name, String email, String password, int age,Long regionKey) {
        this.name = name;
        this.email = email;
        this.password = password;
        this.age = age;
        this.regionKey=regionKey;
    }
}
