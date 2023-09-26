package com.dream.backend.controller.transaction;

import com.dream.backend.controller.transaction.request.TransactionRequest;
import com.dream.backend.controller.transaction.response.TransactionObject;
import com.dream.backend.controller.transaction.response.TransactionResponse;
import com.dream.backend.domain.account.Account;
import com.dream.backend.domain.bank_client.BankClient;
import com.dream.backend.domain.transaction.Transaction;
import com.dream.backend.elasitc.service.UserLastAlarmService;
import com.dream.backend.service.account.AccountService;
import com.dream.backend.service.transaction.TransactionService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@RestController
@RequiredArgsConstructor
@RequestMapping("/banking/transaction")
@Slf4j
public class TransactionController {

    private final TransactionService transactionService;
    private final UserLastAlarmService alarmService;

    @GetMapping("/all")
    public List<Transaction> getAllTransaction() {
        List<Transaction> result = transactionService.getAllTransaction();

        return result;
    }

    @GetMapping("/range/{account_number}/{start_date}/{end_date}")
    public TransactionResponse getRangedTransaction(
            @PathVariable("start_date") String start,
            @PathVariable("end_date") String end,
            @PathVariable("account_number") Long account) {
        List<TransactionObject> list = new ArrayList<>();

        int year = Integer.parseInt(start.substring(0, 4));
        int month = Integer.parseInt(start.substring(5, 7));
        int day = Integer.parseInt(start.substring(8, 10));

        LocalDate sDate = LocalDate.of(year, month, day);

        year = Integer.parseInt(end.substring(0, 4));
        month = Integer.parseInt(end.substring(5, 7));
        day = Integer.parseInt(end.substring(8, 10));

        LocalDate eDate = LocalDate.of(year, month, day + 1);

        List<Transaction> result =  transactionService.getTransactionByDateRange(sDate.atStartOfDay(), eDate.atStartOfDay(), account);
        Account acc = result.get(0).getAccount();
        for(Transaction t: result) {
            list.add(new TransactionObject(t.getTranDate(), t.getInoutType(), null, t.getTranDesc(), t.getTranAmt(), t.getBalance()));
        }

        return new TransactionResponse(acc, list);
    }

    @GetMapping("/{account_number}")
    public TransactionResponse getTransactionByAccount(
            @PathVariable("account_number") Long accountNumber) {

        List<TransactionObject> list = new ArrayList<>();
        List<Transaction> result = transactionService.getTransactionByAccountNumber(accountNumber);

        Account account = result.get(0).getAccount();

        for(Transaction t: result) {
            list.add(new TransactionObject(t.getTranDate(), t.getInoutType(), null, t.getTranDesc(), t.getTranAmt(), t.getBalance()));
        }

        return new TransactionResponse(account, list);
    }

    @GetMapping("/fromLastTime/{user_id}")
    public TransactionResponse getTransactionFromLastTime(
            @PathVariable("user_id") Long userId) {


        List<TransactionObject> list = new ArrayList<>();
        List<Transaction> result = transactionService.getTransactionFromLastTime(userId);
        if(result.isEmpty()) return null;
        Account account = result.get(0).getAccount();
        if(account == null) return null;

        for(Transaction t: result) {
            list.add(new TransactionObject(t.getTranDate(), t.getInoutType(), null, t.getTranDesc(), t.getTranAmt(), t.getBalance()));
        }

        alarmService.setClient();
        alarmService.insertDate(userId);
        alarmService.closeAllClient();

        return new TransactionResponse(account, list);
    }

    @PostMapping("/deposit")
    public String depositToAccount(@RequestBody TransactionRequest request) {
        transactionService.insertTransaction(request);

        return "OK";
    }
}
