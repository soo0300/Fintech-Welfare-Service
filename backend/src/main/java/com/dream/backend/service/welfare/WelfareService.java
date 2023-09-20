package com.dream.backend.service.welfare;

import com.dream.backend.controller.welfare.response.WelfareResponse;
import com.dream.backend.domain.welfare.Welfare;
import com.dream.backend.domain.welfare.repository.WelfareRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@RequiredArgsConstructor
@Service
@Transactional
public class WelfareService {

    private final WelfareRepository welfareRepository;

    public List<WelfareResponse> getAllWelfare() {
        List<WelfareResponse> list = new ArrayList<>();
        //모든 Welfare 테이블을 순회하면서 response 로 바꿔준다.
        List<Welfare> welfareAll = welfareRepository.findAll();
        for (Welfare welfare : welfareAll) {
            list.add(toResponse(Optional.ofNullable(welfare)));
        }

        return list;
    }

    public List<Welfare> getRegionWelfare(List<Long> list) {
        int i=0;
        List<Welfare> welfareList = new ArrayList<>();
        for (Long l : list) {
            Optional<Welfare> welfare = welfareRepository.findById(list.get(i));
            welfareList.add(welfare.get());
            i++;
        }
        return welfareList;
    }


    private WelfareResponse toResponse(Optional<Welfare> welfare) {
        return WelfareResponse.builder()
                .id(welfare.get().getId())
                .name(welfare.get().getName())
                .organization(welfare.get().getOrganization())
                .start_date(welfare.get().getStart_date())
                .end_date(welfare.get().getEnd_date())
                .route(welfare.get().getRoute())
                .submission(welfare.get().getSubmission())
                .support_fund(welfare.get().getSupport_fund())
                .description_origin(welfare.get().getDescription_origin())
                .url(welfare.get().getUrl())
                .img(welfare.get().getImg())
                .support_period(welfare.get().getSupport_period())
                .etc(welfare.get().getEtc())
                .build();

    }

}