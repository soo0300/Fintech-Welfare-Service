package com.dream.backend.domain.account.repository;

import com.dream.backend.domain.account.Account;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface accountCrudInterface extends JpaRepository<Account, Long> {

//    public Account findByNumber();
}
