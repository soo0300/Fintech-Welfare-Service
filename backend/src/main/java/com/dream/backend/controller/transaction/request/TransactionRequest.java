package com.dream.backend.controller.transaction.request;

import com.dream.backend.domain.transaction.Transaction;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class TransactionRequest {

    private int tran_amt;
    private Long account_number;
    private String tran_desc;
    private int inout_type;

    public TransactionRequest(int tran_amt, Long account_number, String tran_desc, int inout_type) {
        this.tran_amt = tran_amt;
        this.account_number = account_number;
        this.tran_desc = tran_desc;
        this.inout_type = inout_type;
    }
}
