package com.dream.backend.domain.qualification;

import com.dream.backend.domain.region.Region;
import com.dream.backend.domain.welfare.Welfare;
import javax.persistence.*;
import java.io.Serializable;


@Embeddable
public class Qualification implements Serializable {
    @OneToOne
    @JoinColumn(name = "welfare_id")
    private Welfare welfare;

    @OneToOne
    @JoinColumn(name = "region_key")
    private Region region;

    @Column
    private int age;

    @Column
    private int end_year;

}
