package com.dream.backend.service.benefit;

import com.dream.backend.controller.benefit.response.BenefitResponse;
import com.dream.backend.domain.benefit.Benefit;
import com.dream.backend.domain.benefit.repostiory.BenefitRepository;
import com.dream.backend.domain.user.User;
import com.dream.backend.domain.user.repository.UserRepository;
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
public class BenefitService {
    private final BenefitRepository benefitRepository;
    private final WelfareRepository welfareRepository;
    private final UserRepository userRepository;

    public Long addExamine(Long userId, Long welfareId, int status) {
        Optional<Welfare> welfare = welfareRepository.findById(welfareId);
        Optional<User> user = userRepository.findById(userId);
        Benefit benefit = toEntity(welfare, user, status);
        Benefit savedBenefit = benefitRepository.save(benefit);
        return savedBenefit.getId();
    }

    public List<BenefitResponse> getUserBenefit(Long userId, int status) {
        List<BenefitResponse> list = new ArrayList<>();
        List<Benefit> benefits = benefitRepository.findByUserIdAndStatus(userId,status).orElseThrow();
        //순회하면서 해당 benefit의 welfare_id를 찾아온다.
        for (Benefit benefit : benefits) {
            Long welfareId = benefit.getWelfare().getId();
            System.out.println("사용자 등록한 복지(2가지 종류, staus에 따라 결정)" + welfareId);
            //welfareId 를 통해서 Welfare 객체를 가져온다.
            Optional<Welfare> welfare = welfareRepository.findById(welfareId);
            //Response 형태로 바꾼다.
            list.add(toResponse(welfare));
        }
        return list;
    }




    //- - - - - - - - - 비즈니스 로직 - - - - - - - - -
    private Benefit toEntity(Optional<Welfare> welfare, Optional<User> user, int status) {
        return Benefit.builder()
                .welfare(welfare.get())
                .user(user.get())
                .status(status)
                .build();
    }

    private BenefitResponse toResponse(Optional<Welfare> welfare){
        return BenefitResponse.builder()
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

    public List<BenefitResponse> getUserAllBenefit(Long userId) {
        List<BenefitResponse> list = new ArrayList<>();
        return list;
    }
}