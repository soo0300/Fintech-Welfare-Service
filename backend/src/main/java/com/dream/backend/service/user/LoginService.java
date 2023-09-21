package com.dream.backend.service.user;

import com.dream.backend.domain.user.User;
import com.dream.backend.domain.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
@Transactional
@RequiredArgsConstructor
public class LoginService {

    private final UserRepository userRepository;

    public Long loginUser(String email, String pwd) {
        Optional<User> user = Optional.ofNullable(userRepository.findByEmailAndPassword(email, pwd));
        Long id = user.get().getId();
        return id;

    }
}
