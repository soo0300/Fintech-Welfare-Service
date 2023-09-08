package com.dream.backend.elasitc.service;

import co.elastic.clients.elasticsearch.ElasticsearchClient;
import com.dream.backend.elasitc.repo.WelfareInfoRepo;

public class WelfareInfoService {

    private ElasticsearchClient client = null;

    public WelfareInfoService(ElasticsearchClient client) {
        // 클라이언트 부여
        this.client = client;

        // WelfareInfo Index 존재 검사 -> 없으면 Index 생성

    }
}
