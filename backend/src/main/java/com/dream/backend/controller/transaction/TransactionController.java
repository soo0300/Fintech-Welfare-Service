package com.dream.backend.controller.transaction;


import com.dream.backend.domain.transaction.Transaction;
import com.dream.backend.service.account.AccountService;
import com.dream.backend.service.transaction.TransactionService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@RestController
@RequiredArgsConstructor
@RequestMapping("/transaction")
@Slf4j
public class TransactionController {

    private final TransactionService transactionService;

    @GetMapping("/all")
    public List<Transaction> getAllTransaction() {
        List<Transaction> result = transactionService.getAllTransaction();

        return result;
    }

    @GetMapping("/range/{start_date}/{end_date}/{account_number}")
    public List<Transaction> getRangedTransaction(
            @PathVariable("start_date") String start,
            @PathVariable("end_date") String end,
            @PathVariable("account_number") Long account) {

        int year = Integer.parseInt(start.substring(0, 4));
        int month = Integer.parseInt(start.substring(5, 7));
        int day = Integer.parseInt(start.substring(8, 10));

        LocalDate sDate = LocalDate.of(year, month, day);

        year = Integer.parseInt(end.substring(0, 4));
        month = Integer.parseInt(end.substring(5, 7));
        day = Integer.parseInt(end.substring(8, 10));

        LocalDate eDate = LocalDate.of(year, month, day + 1);

        return transactionService.getTransactionByDateRange(sDate.atStartOfDay(), eDate.atStartOfDay(), account);
    }
}
