package com.dream.backend.service.user.dto;
import lombok.Builder;

import java.time.LocalDateTime;

public class JoinUserDto {
    private String name;
    private String email;
    private String password;
    private int residenceInfo;
    private int regionKey;
    private LocalDateTime endDate;
    private boolean isEnded;

    @Builder
    public JoinUserDto(String name, String email, String password, int residenceInfo, int regionKey, LocalDateTime endDate, boolean isEnded){
        this.name=name;
        this.email=email;
        this.password=password;
        this.residenceInfo=residenceInfo;
        this.regionKey=regionKey;
        this.endDate=endDate;
        this.isEnded=isEnded;
    }
}
