package com.dream.backend.domain.benefit;

import com.dream.backend.domain.user.User;
import com.dream.backend.domain.welfare.Welfare;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Benefit {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "benefit_id", nullable = false, updatable = false)
    private Long id;

    @OneToOne
    @JoinColumn(name = "user_id", nullable = false, updatable = false)
    private User user;

    @OneToOne
    @JoinColumn(name = "welfare_id", nullable = false, updatable = false)
    private Welfare welfare;

    @Column
    private int status;

    @Column
    private int benefit_cnt;

    @Column
    private boolean is_confirmed;

    @Builder
    public Benefit(Long id, User user, Welfare welfare, int status, int benefit_cnt, boolean is_confirmed) {
        this.id = id;
        this.user = user;
        this.welfare = welfare;
        this.status = status;
        this.benefit_cnt = benefit_cnt;
        this.is_confirmed = is_confirmed;
    }
}
