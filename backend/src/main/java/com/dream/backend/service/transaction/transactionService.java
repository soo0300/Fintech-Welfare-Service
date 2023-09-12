package com.dream.backend.service.transaction;

import com.dream.backend.domain.transaction.Transaction;
import com.dream.backend.domain.transaction.repository.TransactionRepository;
import com.dream.backend.service.transaction.dto.GetTransactionDto;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.util.List;

@RequiredArgsConstructor
@Service
@Transactional
public class transactionService {

    private TransactionRepository transactionRepository;

    public List<GetTransactionDto> getTransactionByDateRange(LocalDateTime startDate, LocalDateTime endDate, int accountNumber) {
        List<GetTransactionDto> result= null;

        long unixStartDate = Timestamp.valueOf(startDate).getTime();
        long unixEndDate = Timestamp.valueOf(endDate).getTime();

        return result;
    }
}
