package com.dream.backend.domain.benefit;

import com.dream.backend.domain.user.User;
import com.dream.backend.domain.welfare.Welfare;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Benefit {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="benefit_id")
    private Long id;

    @OneToOne
    @JoinColumn(name="user_id")
    private User user;

    @OneToOne
    @JoinColumn(name="welfare_id")
    private Welfare welfare;



}
