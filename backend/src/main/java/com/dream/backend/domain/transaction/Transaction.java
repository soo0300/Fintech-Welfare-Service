package com.dream.backend.domain.transaction;

import com.dream.backend.domain.account.Account;
import com.dream.backend.domain.bank.Bank;
import com.dream.backend.domain.bank_client.BankClient;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.naming.Name;
import javax.persistence.*;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Transaction {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="transaction_id")
    private Long id;


    @JoinColumn(name="account_number")
    private Account account;

    //account 테이블의 fk를 조인하고 싶을 때!

    @JoinColumn(name="bank_code")
    private Bank bank;


    @JoinColumn(name = "client_key")
    private BankClient client;

    @Column(name = "bank_name", length = 50)
    private String bankName;

    @Column(name = "branch_name", length = 50)
    private String branchName;

    @Column(name = "tran_date")
    private LocalDateTime tranDate;

    @OneToOne
    private int tranType;

    @OneToOne
    private int inoutType;

    @Column(name = "tran_desc", length = 50)
    private String tranDesc;

    @Column(name = "tran_amt")
    private int tranAmt;

    @Column(name = "after_balanced_amt")
    private int balance;

    @Builder
    public Transaction(long id, Account account, Bank bank, BankClient clint, String bankName, String branchName, LocalDateTime tranDate, int tranType, int inoutType, String tranDesc, int tranAmt, int balance) {
        this.id = id;
        this.account = account;
        this.bank = bank;
        this.client = clint;
        this.bankName = bankName;
        this.branchName = branchName;
        this.tranDate = tranDate;
        this.tranType = tranType;
        this.inoutType = inoutType;
        this.tranDesc = tranDesc;
        this.tranAmt = tranAmt;
        this.balance = balance;
    }

    public LocalDateTime getTranDate() {
        return tranDate;
    }

    // ----- 비지니스 로직 ------ //
}