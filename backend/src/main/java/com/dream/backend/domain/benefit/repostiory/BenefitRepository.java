package com.dream.backend.domain.benefit.repostiory;

import com.dream.backend.domain.benefit.Benefit;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface BenefitRepository extends JpaRepository<Benefit, Long> {
    Optional<List<Benefit>> findByUserIdAndStatus(Long user_id, int status);
}
