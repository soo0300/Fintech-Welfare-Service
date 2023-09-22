package com.dream.backend.elasitc.controller;

import com.dream.backend.elasitc.entity.UserLastAlarm;
import com.dream.backend.elasitc.entity.UserLastAlarmDto;
import com.dream.backend.elasitc.service.UserLastAlarmService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;

@RestController
@RequiredArgsConstructor
@RequestMapping("/alarm")
@Slf4j
public class UserLastAlarmController {

    private final UserLastAlarmService alarmService;

    @GetMapping("/get/{user_id}")
    public UserLastAlarmDto getUserLastDateTime(@PathVariable("user_id") Long userId) {
        alarmService.setClient();
        UserLastAlarm alarm = alarmService.getDateTime(userId);
        alarmService.closeAllClient();
        return new UserLastAlarmDto(userId, alarm.getDateTime());
    }

    @PostMapping("/insert/{user_id}")
    public String insertDateTime(@PathVariable("user_id") Long userId) {
        alarmService.setClient();
        alarmService.insertDate(userId);
        alarmService.closeAllClient();
        return "OK";
    }
}
