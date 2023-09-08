package com.dream.backend.domain.account;

import com.dream.backend.domain.bank.Bank;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Account {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="account_number")
     private Long number;

    @OneToOne
    @JoinColumn(name="bank_code")
    private Bank bank;

}
