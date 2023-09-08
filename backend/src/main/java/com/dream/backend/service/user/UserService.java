package com.dream.backend.service.user;

import com.dream.backend.domain.user.User;
import com.dream.backend.domain.user.repository.UserRepository;
import com.dream.backend.service.user.dto.JoinUserDto;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@RequiredArgsConstructor
@Service
@Transactional
public class UserService {

    private final UserRepository userRepository;

    public Long joinUser(JoinUserDto dto) {
        User user = dto.toEntity();
        User saveduser = userRepository.save(user);
        return saveduser.getId();
    }


}
