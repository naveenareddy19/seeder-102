package com.bc102.seeder.cashkickservice.repository;

import com.bc102.seeder.cashkickservice.entity.CashKick;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CashKickRepository extends JpaRepository<CashKick,Integer> {
    List<CashKick> findByUserId(int userId);
}
