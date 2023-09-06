package com.dream.backend.domain.qualification;

import com.dream.backend.domain.welfare.Welfare;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED\)
public class Qualification {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @OneToOne
    @JoinColumn(name="welfare_id")
    private Welfare welfare;

    @OneToOne
    @JoinColumn(name="region_key")
    private Qualification qualification;

    @Column
    private int age;

    @Column
    private int end_year;

}
