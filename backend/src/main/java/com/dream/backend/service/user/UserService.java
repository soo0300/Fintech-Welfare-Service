package com.dream.backend.service.user;

import com.dream.backend.controller.user.response.UserResponse;
import com.dream.backend.domain.region.Region;
import com.dream.backend.domain.region.repository.RegionRepository;
import com.dream.backend.domain.user.User;
import com.dream.backend.domain.user.repository.UserRepository;
import com.dream.backend.domain.welfare.repository.WelfareRepository;
import com.dream.backend.service.benefit.BenefitService;
import com.dream.backend.service.qualification.QualificationService;
import com.dream.backend.service.user.dto.JoinUserDto;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@RequiredArgsConstructor
@Service
@Transactional
public class UserService {

    private final UserRepository userRepository;
    private final RegionRepository regionRepository;
    private final QualificationService qualificationService;
    private final BenefitService benefitService;
    private final WelfareRepository welfareRepository;

    public Long joinUser(JoinUserDto dto, int type) {
        System.out.println("dto region key: " + dto.getRegionKey());
        Optional<Region> savedRegion = regionRepository.findById(dto.getRegionKey());
        User user = dto.toEntity(savedRegion);
        System.out.println("before Repo: " + user.getName());
        User saveduser = userRepository.save(user);
        System.out.println("after Repo" + saveduser.getId());

        // - - 비즈니스 로직 [사용자 거주 지역 코드]
        Long myRegion = dto.getRegionKey();

        // - - 비즈니스 로직 [만 나이 계산기]
        //user 주민번호 필요, user createdDate 필요
        int my = saveduser.getResidence_info();

        int age = getAge(saveduser.getResidence_info(), String.valueOf(saveduser.getCreated_date()));
        System.out.println("만 나이 계산 성공?: " + age);


        //사용자 자격조건에 맞는 복지 식별키 리스트 가져오기
        List<Long> getUserWelfareKey = qualificationService.getUserWelfareKey(age, myRegion);

        //자격 조건 테이블에서 사용자 만 나이, 지역 키 , 나이로 복지식별키 구분
        //순회하면서 현재 사용자 id와 리스트이 key와 status[null]로 사용자복지정보 등록
        System.out.print("size: " + getUserWelfareKey.size() + "\n사용자 맞춤형 복지 PK:");
        for (int i = 0; i < getUserWelfareKey.size(); i++) {
            System.out.print(getUserWelfareKey.get(i) + " ");
        }
        benefitService.addUserBenefit(saveduser.getId(), getUserWelfareKey, 0);

        //마이데이터 불러오기를 한 경우,\
        List<Long> getFilteredWelfareKey = new ArrayList<>();
        if (type == 1) {
            //마이데이터 연결해야하면, getUserWelfareKey 에 해당하는 복지입금코드가죠오기
            List<String> welfareCodeList = new ArrayList<>();
            for (int i = 0; i < getUserWelfareKey.size(); i++) {
                String welfare_code = welfareRepository.findWelfareCodeById(getUserWelfareKey.get(i));

                //+ 기간 설정 필요
                //+ 거래내역 테이블에서 거래명(ABC자립복지)에 입금거래코드(ABC) 가 포함된 것을 찾아서 비교하여 같다면 welfare_id를 가져온다.
                //+ benefit 사용자 복지 테이블에서 welfare_id를 발견하면 benefit의 status 를 1로 바꾼다.
//                getFilteredWelfareKey.add();

            }
            //거래내역 테이블에서 파싱하기

            //파싱한 값을 가지고 자격조건 테이블에서

        }
        return saveduser.getId();
    }

    public Optional<User> getUserFund(Long userId) {
        return userRepository.findById(userId);
    }

    public UserResponse getUserInfo(Long userId) {
        Optional<User> user = userRepository.findById(userId);
        UserResponse response = toUserResponse(user);
        return response;
    }

    public UserResponse changeUserInfo(Long userId, Long regionKey) {
        Optional<User> user = userRepository.findById(userId);
//        user.change(regionKey);
        UserResponse userResponse = toUserResponse(user);
        return null;
    }


    //    - - - - - - - - - 비즈니스 로직 - - - - - - - - -
    public UserResponse toUserResponse(Optional<User> user) {
        return UserResponse.builder()
                .name(user.get().getName())
                .email(user.get().getEmail())
                .regionKey(user.get().getRegion().getId())
                .age(getAge(user.get().getResidence_info(), String.valueOf(user.get().getCreated_date())))
                .password(user.get().getPassword())
                .build();
    }


    //만 나이 계산 함수 작성
    public int getAge(int residenceInfo, String now) {
        //순서대로 : 사용자 생년/ 월,일
        int userBirthY = residenceInfo / 100000 + 1900;
        int userBirthMM = (residenceInfo % 100000) / 10;

        //만 나이 계산을 위한 현재 시간 파싱, 순서대로 년도 / 월,일
        int year = Integer.parseInt(now.substring(0, 4));
        int birth = Integer.parseInt(now.substring(5, 7) + now.substring(8, 10));

        //만 나이 계산 로직
        int age = year - userBirthY;
        if (userBirthMM <= birth) age -= 1;

        return age;

    }


}

