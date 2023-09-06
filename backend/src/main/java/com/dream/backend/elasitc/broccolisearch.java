package com.dream.backend.elasitc;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.elasticsearch.annotations.Document;
@Setter
@Getter
@Document(indexName = "broccolisearch")
public class broccolisearch {
    @Id
    private String id;
    private String client_name;

    @Builder
    public broccolisearch(String id, String client_name) {
        this.id = id;
        this.client_name = client_name;
    }
}
