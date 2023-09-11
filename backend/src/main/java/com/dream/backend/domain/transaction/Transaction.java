package com.dream.backend.domain.transaction;

import com.dream.backend.domain.account.Account;
import com.dream.backend.domain.bank.Bank;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Transaction {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="transaction_id")
    private Long id;

    @ManyToOne
    @JoinColumn(name="account_number")
    private Account account;

    //account 테이블의 fk를 조인하고 싶을 때!
    @ManyToOne
    @JoinColumn(name="bank_code")
    private Bank bank;

    @Column(name = "bank_name", length = 50)
    private String bankName;

    @Column(name = "branch_name", length = 50)
    private String branchName;

    @Column(name = "tran_date")
    private int tranDate;

    @Column(name = "tran_time")
    private int tranTime;

    @JoinColumn(name = "tran_type")
    private int tranType;

    @JoinColumn(name = "inout_type")
    private int inoutType;

    @Column(name = "tran_amt")
    private int tranAmt;

    @Column(name = "after_balanced_amt")
    private int balance;
}