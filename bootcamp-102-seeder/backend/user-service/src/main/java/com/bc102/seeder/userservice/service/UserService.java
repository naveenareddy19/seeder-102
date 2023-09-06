package com.bc102.seeder.userservice.service;

import com.bc102.seeder.userservice.dto.LoginDTO;
import com.bc102.seeder.userservice.dto.UserDTO;
import com.bc102.seeder.userservice.entity.User;

public interface UserService {
    UserDTO getUserById(Long id);
    UserDTO getUserByEmail(String email);
    UserDTO saveUser(User user);
    UserDTO getUserByEmailAndPassword(LoginDTO loginDTO);
}
