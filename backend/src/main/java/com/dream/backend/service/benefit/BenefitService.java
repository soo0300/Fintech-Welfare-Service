package com.dream.backend.service.benefit;

import com.dream.backend.domain.benefit.Benefit;
import com.dream.backend.domain.benefit.repostiory.BenefitRepository;
import com.dream.backend.domain.user.User;
import com.dream.backend.domain.user.repository.UserRepository;
import com.dream.backend.domain.welfare.Welfare;
import com.dream.backend.domain.welfare.repository.WelfareRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@RequiredArgsConstructor
@Service
@Transactional
public class BenefitService {
    private final BenefitRepository benefitRepository;
    private final WelfareRepository welfareRepository;
    private final UserRepository userRepository;
    public Long addExamine(Long userId, Long welfareId, int status){
        Optional<Welfare> welfare = welfareRepository.findById(welfareId);
        Optional<User> user = userRepository.findById(userId);
        Benefit benefit = toEntity(welfare,user,status);
        Benefit savedBenefit = benefitRepository.save(benefit);
        return savedBenefit.getId();
    }

    //- - 비즈니스 로직
    private Benefit toEntity(Optional<Welfare> welfare, Optional<User> user, int status) {
        return Benefit.builder()
                .welfare(welfare.get())
                .user(user.get())
                .status(status)
                .build();
    }


}
