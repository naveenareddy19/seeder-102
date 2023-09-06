package com.bc102.seeder.userservice.config;

import com.bc102.seeder.userservice.dto.LoginDTO;

import java.util.Map;

public interface JWTGenerator {
    Map<String, String> generateToken(LoginDTO loginDTO);
}
