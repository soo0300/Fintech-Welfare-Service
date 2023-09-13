package com.dream.backend.controller.account;

import com.dream.backend.domain.account.Account;
import com.dream.backend.service.account.AccountService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequiredArgsConstructor
@RequestMapping("/account")
@Slf4j
public class AccountController {

    private final AccountService accountService;

    @GetMapping("/{account_number}")
    public Optional<Account> getAccount(@PathVariable("account_number") Long account_number) {
        Optional<Account> account = accountService.getAccount(account_number);

        return account;
    }
}
