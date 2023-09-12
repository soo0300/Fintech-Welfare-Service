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
        System.out.println("dtoregionkey: "+dto.getRegionKey());
        Optional<Region> savedRegion = regionRepository.findById(dto.getRegionKey());
        User user = dto.toEntity(savedRegion);
        System.out.println("before Repo: "+ user.getName());
        User saveduser = userRepository.save(user);
        System.out.println("after Repo"+saveduser.getId());
        int my = saveduser.getResidence_info();
        //순서대로 : 생년/ 월,일 / 성별
        System.out.println(my/100000);
        System.out.println((my%100000)/10);
        System.out.println(my%10);

        // - - 비즈니스 로직 필요
        System.out.println("생년월일: "+saveduser.getResidence_info());
        return saveduser.getId();
    }

    public Optional<User> getUserFund(Long userId){
        return userRepository.findById(userId);
    }

}
