package com.dream.backend.controller.user.response;

import lombok.Builder;
import lombok.Data;

@Data
public class UserFundResponse {
    private int pre_fund;
    private int total_fund;

    @Builder
    private UserFundResponse(int pre_fund, int total_fund){
        this.pre_fund=pre_fund;
        this.total_fund=total_fund;
    }

}
