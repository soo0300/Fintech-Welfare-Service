package com.dream.backend.elasitc.controller;

import com.dream.backend.elasitc.entity.WelfareInfo;
import com.dream.backend.elasitc.service.WelfareInfoService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;
import java.util.Optional;

@RestController
@RequiredArgsConstructor
@RequestMapping("/welfare_info")
@Slf4j
public class WelfareInfoController {

    private final WelfareInfoService welfareInfoService;

    @GetMapping("/{id}")
    public WelfareInfo getInfo(@PathVariable("id") int id) throws IOException {

        welfareInfoService.setClient();
        WelfareInfo welfareInfo = welfareInfoService.getDocument(id);
        welfareInfoService.closeAllClient();

        return welfareInfo;
    }
}
