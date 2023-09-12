package com.dream.backend.service.qualification;

import com.dream.backend.domain.qualification.repository.QualificationRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@RequiredArgsConstructor
@Service
@Transactional
public class QualificationService {

    private final QualificationRepository qualificationRepository;

    public List<Integer> getUserWelfareKey(int age, int regionKey){
        List<Integer> list = new ArrayList<>();
        //리포지토리에서 자격조건 테이블에서 현재 regionkey가 같고
        //현재 age보다 테이블 컬럼의 age보다 작으면 welfare_id 가져오기
        //qualificationRepostiory.find~~
        return list;
    }


}

