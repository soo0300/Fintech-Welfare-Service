package com.dream.backend.controller.transaction.response;

import com.dream.backend.domain.inout_type.InoutType;
import com.dream.backend.domain.transaction_category.TransactionCategory;
import com.dream.backend.domain.welfare.Welfare;
import com.dream.backend.domain.welfare.repository.WelfareRepository;
import com.dream.backend.service.welfare.dto.welfareDto;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class WelfareAndTransactionResponse {

    private LocalDateTime dateTime;
    private InoutType type;
    private TransactionCategory category;
    private WelfareRepository.WelfareNativeVo welfare;
    private int tranAmt;
    private int afterAmt;
}