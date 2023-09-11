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
        System.out.print("after Repo"+saveduser.getId());
        return saveduser.getId();
    }

    public Optional<User> getUserFund(Long userId){
        return userRepository.findById(userId);
    }

}
