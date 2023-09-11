package com.dream.backend.controller.welfare;

import com.dream.backend.controller.welfare.response.WelfareResponse;
import com.dream.backend.service.welfare.WelfareService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@Slf4j
@RequiredArgsConstructor
@RestController
@RequestMapping("/welfare")
public class WelfareController {

    private final WelfareService welfareService;

    //복지 정보 전체 조회 하기
    @GetMapping("/all")
    public List<WelfareResponse> getAllWelfare(){
        return welfareService.getAllWelfare();
    }

}
