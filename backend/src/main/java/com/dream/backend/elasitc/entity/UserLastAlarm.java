package com.dream.backend.elasitc.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder()
public class UserLastAlarm {

    private Long id;
    private LocalDateTime dateTime;


}
