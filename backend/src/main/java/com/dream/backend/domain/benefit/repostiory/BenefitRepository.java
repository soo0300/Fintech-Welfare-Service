package com.dream.backend.domain.benefit.repostiory;

import com.dream.backend.domain.benefit.Benefit;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BenefitRepository extends JpaRepository<Benefit, Long> {
}
