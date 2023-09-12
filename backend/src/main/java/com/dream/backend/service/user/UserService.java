package com.dream.backend.service.user;

import com.dream.backend.domain.region.Region;
import com.dream.backend.domain.region.repository.RegionRepository;
import com.dream.backend.domain.user.User;
import com.dream.backend.domain.user.repository.UserRepository;
import com.dream.backend.service.user.dto.JoinUserDto;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@RequiredArgsConstructor
@Service
@Transactional
public class UserService {

    private final UserRepository userRepository;
    private final RegionRepository regionRepository;

    public Long joinUser(JoinUserDto dto) {
        System.out.println("dtoregionkey: " + dto.getRegionKey());
        Optional<Region> savedRegion = regionRepository.findById(dto.getRegionKey());
        User user = dto.toEntity(savedRegion);
        System.out.println("before Repo: " + user.getName());
        User saveduser = userRepository.save(user);
        System.out.println("after Repo" + saveduser.getId());

        // - - 비즈니스 로직 [만 나이 계산기]
        int my = saveduser.getResidence_info();
        //순서대로 : 생년/ 월,일 / 성별
        int userBirthY = my / 100000 + 1900 ;
        int userBirthMM = (my % 100000) / 10;
        int gender = my % 10;

        System.out.println("생년월일: " + saveduser.getResidence_info());
        String nowDate = String.valueOf(saveduser.getCreated_date());
        int year = Integer.parseInt(nowDate.substring(0, 4));
        int birth = Integer.parseInt(nowDate.substring(5, 7) + nowDate.substring(8, 10));
        System.out.println("현재시간 파싱: " + year + " " + birth);
        int age = year - userBirthY;
        if(userBirthMM<=birth) age-=1;
        System.out.println(age);
        return saveduser.getId();
    }

    public Optional<User> getUserFund(Long userId) {
        return userRepository.findById(userId);
    }

}
