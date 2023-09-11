package com.dream.backend.controller.benefit;

import com.dream.backend.controller.ApiResponse;
import com.dream.backend.service.benefit.BenefitService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/benefit")
public class BenefitController {

    private final BenefitService benefitService;
    @PostMapping("/examine/{user_id}/{welfare_id}/{status}")
    public ApiResponse<Long> addExamine(@PathVariable Long user_id,
                                        @PathVariable Long welfare_id,
                                        @PathVariable int status){
        Long id = benefitService.addExamine(user_id,welfare_id,status);
        return ApiResponse.ok(id);
    }

}
