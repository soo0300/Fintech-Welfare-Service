package com.dream.backend.elasitc.controller;

import com.dream.backend.controller.welfare.response.WelfareResponse;
import com.dream.backend.domain.welfare.Welfare;
import com.dream.backend.domain.welfare.repository.WelfareRepository;
import com.dream.backend.elasitc.entity.WelfareInfo;
import com.dream.backend.elasitc.entity.WelfareInfoRequestDto;
import com.dream.backend.elasitc.service.WelfareInfoService;
import com.dream.backend.service.welfare.WelfareService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@RestController
@RequiredArgsConstructor
@RequestMapping("/welfare_info")
@Slf4j
public class WelfareInfoController {

    private final WelfareInfoService welfareInfoService;
    private final WelfareRepository welfareRepository;

    @GetMapping("/get/{id}")
    public WelfareInfo getInfo(@PathVariable("id") int id) throws IOException {

        welfareInfoService.setClient();
        WelfareInfo welfareInfo = welfareInfoService.getDocument(id);
        welfareInfoService.closeAllClient();

        return welfareInfo;
    }

    @GetMapping("/search")
    public String searchException() {
        return "No Expression...";
    }

    @GetMapping("/search/{expression}")
    public List<WelfareInfo> searchInfo(@PathVariable("expression") String expr) {
        try {
            welfareInfoService.setClient();
            String query = welfareInfoService.tokenized(expr);
            List<WelfareInfo> results = welfareInfoService.searchDocument(query);
            welfareInfoService.closeAllClient();
            if(!results.isEmpty())
                return results;

        } catch(IOException e) {
            e.printStackTrace();
        }
        return null;
    }

    @GetMapping("/search/reliable/{expression}")
    public List<WelfareInfo> reliableSearchInfo(@PathVariable("expression") String expr) {
        try {
            welfareInfoService.setClient();
            String query = welfareInfoService.tokenized(expr);
            List<WelfareInfo> results = welfareInfoService.searchReliableDocument(query);
            welfareInfoService.closeAllClient();
            if(!results.isEmpty())
                return results;

        } catch(IOException e) {
            e.printStackTrace();
        }
        return null;
    }

    @PostMapping("/index")
    public String indexInfo(@RequestBody WelfareInfoRequestDto dto) {
        try {
            welfareInfoService.setClient();
            welfareInfoService.insertDocument(dto.getWelfareId(), dto.getName(), dto.getDescription());
            welfareInfoService.closeAllClient();
        } catch(IOException e) {
            e.printStackTrace();
            return "Bad Request...";
        }

        return "OK";
    }

    @GetMapping("/synchro")
    public String synchronize() {
        try {
            welfareInfoService.setClient();
            List<Welfare> list = welfareRepository.findAll();

            for(Welfare item: list) {
                welfareInfoService.insertDocument(item.getId(), item.getName(), item.getDescription_origin());
            }

            welfareInfoService.closeAllClient();
        } catch(IOException e) {
            e.printStackTrace();
        }

        return "OK";
    }
}
