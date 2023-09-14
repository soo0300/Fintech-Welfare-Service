package com.dream.backend.elasitc.entity;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.Entity;
import javax.persistence.Id;

@Entity
@Getter
@AllArgsConstructor
public class WelfareInfo {

    @Id
    private int welfareId;
    private String name;
    private String description;
    private String keywords;

    public WelfareInfo(int welfare_id, String name, String description) {
        this.welfareId = welfare_id;
        this.name = name;
        this.description = description;
    }

    public void setKeywords(String words) {
        this.keywords = words;
    }

    public int getWelfareId() { return this.welfareId; }
    public String getDescription() { return this.description; }
}
