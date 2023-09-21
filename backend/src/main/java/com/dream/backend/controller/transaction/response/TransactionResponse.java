package com.dream.backend.controller.transaction.response;

import com.dream.backend.domain.account.Account;
import com.dream.backend.domain.bank_client.BankClient;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class TransactionResponse {

    private Account account;
    private List<TransactionObject> list;
}
