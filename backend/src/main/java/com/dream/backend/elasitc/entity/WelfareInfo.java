package com.dream.backend.elasitc.entity;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.Entity;
import javax.persistence.Id;


@Getter
@Setter
@JsonIgnoreProperties(ignoreUnknown = true)
@NoArgsConstructor
public class WelfareInfo {

    @Id
    private int welfareId;
    private String name;
    private String description;
    private String keywords;
    private double score;

    public WelfareInfo(int welfareId, String name, String description, String keywords) {
        this.welfareId = welfareId;
        this.name = name;
        this.description = description;
        this.keywords = keywords;
    }

    public void setKeywords(String words) {
        this.keywords = words;
    }

    public int getWelfareId() { return this.welfareId; }
    public String getDescription() { return this.description; }
}
