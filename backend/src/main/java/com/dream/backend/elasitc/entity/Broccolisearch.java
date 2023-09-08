package com.dream.backend.elasitc.entity;

import java.sql.Timestamp;
import java.text.SimpleDateFormat;

public class Broccolisearch {
    private String tokenized;
    private Timestamp modification_time;
    private Timestamp insertion_time;
    private String client_name;

    public Broccolisearch(String client_name) {
        this.client_name = client_name;
        this.tokenized = "";
        this.modification_time = new Timestamp(System.currentTimeMillis());
        this.insertion_time = modification_time;
    }

    public String toString() {
        return client_name;
    }
}
