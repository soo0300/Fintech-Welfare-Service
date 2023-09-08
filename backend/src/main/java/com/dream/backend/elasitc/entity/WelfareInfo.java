package com.dream.backend.elasitc.entity;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.Entity;
import javax.persistence.Id;

@Entity
@Getter
@Setter
@AllArgsConstructor
public class WelfareInfo {

    @Id
    private int welfare_id;
    private String name;
    private String description;
    private String keywords;
}
