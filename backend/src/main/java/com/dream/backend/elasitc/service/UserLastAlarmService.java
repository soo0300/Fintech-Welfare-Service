package com.dream.backend.elasitc.service;

import co.elastic.clients.elasticsearch.core.IndexResponse;
import com.dream.backend.elasitc.entity.UserLastAlarm;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.io.IOException;
import java.time.LocalDateTime;

@Service
@Transactional
@RequiredArgsConstructor
public class UserLastAlarmService extends ElasticConnectionService {

    public void createIndex() {
        try {
            esClient.indices().create(c -> c.index("user_alarm_date"));
        } catch(IOException e) {
            e.printStackTrace();
        }
    }

    public String insertDate(Long userId) {
        try {
            IndexResponse response = esClient.index(i -> i
                    .index("user_alarm_date")
                    .document(UserLastAlarm.builder().id(userId).dateTime(LocalDateTime.now()).build()));
        } catch(IOException e) {
            e.printStackTrace();
        }

        return "";
    }
}
