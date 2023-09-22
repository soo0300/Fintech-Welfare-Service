package com.dream.backend.domain.transaction.repository;

import com.dream.backend.domain.account.Account;
import com.dream.backend.domain.transaction.Transaction;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface TransactionRepository extends JpaRepository<Transaction, Long> {

    List<Transaction> findAllByAccount(Optional<Account> account);

    @Query("SELECT t FROM Transaction t WHERE t.tranDesc LIKE %:welfareCode%")
    Transaction findByTranDesc(String welfareCode);
}
