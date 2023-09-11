package com.dream.backend.service.transaction.dto;

import com.dream.backend.domain.transaction.repository.TransactionRepository;

import java.time.LocalDateTime;

public class transactionDto {

    private TransactionRepository transactionRepository;
    private int transactionId;
    private int accountNumber;
    private int bankCode;
    private int clientKey;
    private String bankName;
    private String branchName;
    private LocalDateTime tranDate;
    private int tranTime;
    private int tranType;
    private int inout_Type;
    private String tranDesc;
    private int tranAmt;
    private int afterBalance;
}
