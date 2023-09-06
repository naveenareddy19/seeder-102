package com.bc102.seeder.paymentsservice.respository;

import com.bc102.seeder.paymentsservice.entity.Payments;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PaymentsRepository extends JpaRepository<Payments,Integer> {
    public List<Payments> findByUserId(int userId);
}
