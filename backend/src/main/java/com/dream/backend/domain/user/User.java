package com.dream.backend.domain.user;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.annotation.CreatedDate;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "user_id")
    private Long id;

    @Column(nullable = false, length = 20, updatable = false)
    private String name;

    @Column(nullable = false, length = 100)
    private String email;

    @Column(nullable = false, length = 225)
    private String password;

    @Column(nullable = false, updatable = false)
    private int residence_info;

    @Column(nullable = true)
    private LocalDateTime end_date;

    @Column(nullable = false)
    private boolean is_ended;

    @Column(nullable = true, length = 50)
    private String address_1;

    @Column(nullable = true, length = 50)
    private String address_2;

    @CreatedDate
    @Column(nullable = false, updatable = false)
    private LocalDateTime created_date;

    @Column(nullable = true)
    private int pre_fund;

    @Column(nullable = true)
    private int total_fund;

    @Column(nullable = true)
    private int account;

}
