package com.dream.backend.elasitc;

import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

public interface Repository extends ElasticsearchRepository<broccolisearch, String> {
}
