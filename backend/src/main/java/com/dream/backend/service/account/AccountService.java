package com.dream.backend.service.account;

import com.dream.backend.domain.account.Account;
import com.dream.backend.domain.account.repository.AccountRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
@Transactional
@RequiredArgsConstructor
public class AccountService {

    private final AccountRepository accountRepository;

    public Optional<Account> getAccount(Long accountNumber) {
        Optional<Account> account = accountRepository.findById(accountNumber);
        return account;
    }

}
