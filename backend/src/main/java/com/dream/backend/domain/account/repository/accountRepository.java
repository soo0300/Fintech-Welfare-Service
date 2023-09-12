package com.dream.backend.domain.account.repository;

import com.dream.backend.domain.account.Account;
import org.springframework.data.jpa.repository.JpaRepository;

public interface accountRepository extends JpaRepository<Account, Long> {

}
