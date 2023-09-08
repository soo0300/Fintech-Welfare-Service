package com.dream.backend.controller.user.request;

import com.dream.backend.service.user.dto.JoinUserDto;
import com.sun.istack.NotNull;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
public class JoinUserRequest {
    @NotNull
    private String name;
    @NotNull
    private String email;
    @NotNull
    private String password;
    @NotNull
    private int residenceInfo;
    @NotNull
    private Long regionKey;
    @NotNull
    private LocalDateTime endDate;
    @NotNull
    private boolean isEnded;

    @Builder
    private JoinUserRequest(String name, String email, String password, int residenceInfo, Long regionKey, LocalDateTime endDate, boolean isEnded) {
        this.name = name;
        this.email = email;
        this.password = password;
        this.residenceInfo = residenceInfo;
        this.regionKey = regionKey;
        this.endDate = endDate;
        this.isEnded = isEnded;
    }

    public JoinUserDto toDto() {
        return JoinUserDto.builder()
                .name(this.name)
                .email(this.email)
                .password(this.password)
                .residenceInfo(this.residenceInfo)
                .regionKey(this.regionKey)
                .endDate(endDate)
                .isEnded(isEnded)
                .build();
    }

}
