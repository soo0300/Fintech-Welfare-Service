package com.dream.backend.elasitc;

import org.elasticsearch.client.RestHighLevelClient;
import org.springframework.beans.factory.annotation.Autowired;

public class ElasticsearchService {

    private final RestHighLevelClient elasticsearchClient;

    @Autowired
    public ElasticsearchService(RestHighLevelClient elasticsearchClient) {
        this.elasticsearchClient = elasticsearchClient;
    }
}
