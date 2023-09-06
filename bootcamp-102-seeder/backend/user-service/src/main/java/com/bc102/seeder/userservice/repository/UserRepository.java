package com.bc102.seeder.userservice.repository;

import com.bc102.seeder.userservice.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByEmail(String email);

    @Query(value="select * from user where email=:email and password=:password", nativeQuery=true)
    Optional<User> findByEmailAndPassword(String email,String password);
}
