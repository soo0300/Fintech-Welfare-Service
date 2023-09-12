package com.dream.backend.domain.transaction.repository;

import com.dream.backend.domain.account.Account;
import com.dream.backend.domain.transaction.Transaction;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TransactionRepository extends JpaRepository<Transaction, Long> {

}
