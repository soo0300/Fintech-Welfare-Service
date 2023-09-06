package com.dream.backend.service.user.dto;

import com.dream.backend.domain.region.Region;
import com.dream.backend.domain.region.repository.RegionRepository;
import com.dream.backend.domain.user.User;
import lombok.Builder;

import java.time.LocalDateTime;
import java.util.NoSuchElementException;
import java.util.Optional;

public class JoinUserDto {

    private RegionRepository regionRepository;
    private String name;
    private String email;
    private String password;
    private int residenceInfo;
    private Long regionKey;
    private LocalDateTime endDate;
    private boolean isEnded;

    @Builder
    public JoinUserDto(String name, String email, String password, int residenceInfo, Long regionKey, LocalDateTime endDate, boolean isEnded) {
        this.name = name;
        this.email = email;
        this.password = password;
        this.residenceInfo = residenceInfo;
        this.regionKey = regionKey;
        this.endDate = endDate;
        this.isEnded = isEnded;
    }

    public User toEntity() {
//        여기에 regionKey에 알맞는 region 객체를 찾아오고 싶음.
        Optional<Region> regionOptional = regionRepository.findById(regionKey);
        Region region = regionOptional.orElseThrow(() -> new NoSuchElementException("Region not found for regionKey: " + regionKey));
        return User.builder()
                .name(this.name)
                .email(this.email)
                .password(this.password)
                .residence_info(this.residenceInfo)
                .region(region)
                .build();
    }
}
