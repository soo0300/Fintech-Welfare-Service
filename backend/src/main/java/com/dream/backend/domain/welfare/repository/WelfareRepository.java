package com.dream.backend.domain.welfare.repository;

import com.dream.backend.domain.welfare.Welfare;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface WelfareRepository extends JpaRepository<Welfare, Long> {

    List<Welfare> findAll();
    Welfare findWelfareCodeById(Long welfareId);
}
