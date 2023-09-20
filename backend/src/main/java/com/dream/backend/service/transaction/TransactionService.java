package com.dream.backend.service.transaction;

import com.dream.backend.domain.account.Account;
import com.dream.backend.domain.account.repository.AccountRepository;
import com.dream.backend.domain.transaction.Transaction;
import com.dream.backend.domain.transaction.repository.TransactionRepository;
import com.dream.backend.service.transaction.dto.GetTransactionDto;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.swing.text.html.Option;
import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@RequiredArgsConstructor
@Service
@Transactional
public class TransactionService {

    private final TransactionRepository transactionRepository;
    private final AccountRepository accountRepository;

    public List<Transaction> getAllTransaction() {
        return transactionRepository.findAll();
    }

    public List<Transaction> getTransactionByAccountNumber(Long accountNumber) {
        Optional<Account> account = accountRepository.findById(accountNumber);
        return transactionRepository.findAllByAccount(account);
    }

    public List<Transaction> getTransactionByDateRange(LocalDateTime startDate, LocalDateTime endDate, Long accountNumber) {
        Optional<Account> account = accountRepository.findById(accountNumber);
        List<Transaction> result = transactionRepository.findAllByAccount(account);

        List<Transaction> filtered = new ArrayList<>();
        long unixStartDate = Timestamp.valueOf(startDate).getTime();
        long unixEndDate = Timestamp.valueOf(endDate).getTime();

        for (Transaction t: result) {
            long tranDate = Timestamp.valueOf(t.getTranDate()).getTime();

            if(tranDate < unixStartDate) continue;
            if(tranDate > unixEndDate) continue;
            filtered.add(t);
        }

        return filtered;
    }
}