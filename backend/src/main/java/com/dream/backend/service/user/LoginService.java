package com.dream.backend.service.user;

import com.dream.backend.domain.user.User;
import com.dream.backend.domain.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.NoSuchElementException;
import java.util.Optional;

@Service
@Transactional
@RequiredArgsConstructor
public class LoginService {

    private final UserRepository userRepository;

    public Long loginUser(String email, String pwd) {
        Optional<User> user = Optional.ofNullable(userRepository.findByEmailAndPassword(email, pwd));
        if (user.isPresent()) {
            return user.get().getId();
        } else {
            // 예외 처리: 유저를 찾을 수 없는 경우
            throw new NoSuchElementException("아이디와 비밀번호를 확인하세요");
        }
    }
}