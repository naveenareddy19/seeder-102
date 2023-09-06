package com.bc102.seeder.userservice.service;

import com.bc102.seeder.userservice.dto.LoginDTO;
import com.bc102.seeder.userservice.dto.UserDTO;
import com.bc102.seeder.userservice.entity.User;
import com.bc102.seeder.userservice.exceptions.UserNotFoundException;
import com.bc102.seeder.userservice.repository.UserRepository;
import jakarta.persistence.PersistenceException;
import jakarta.transaction.Transactional;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@Slf4j
public class UserServiceImpl implements UserService{
    @Autowired
    private UserRepository userRepository;

    @Override
    @Transactional
    public UserDTO getUserById(Long id) {
        Optional<User> user = userRepository.findById(id);
        UserDTO userDTO;
        if(user.isPresent()){
            userDTO = UserDTO.convertEntityToDto(user.get());
        }
        else {
            throw new UserNotFoundException("Did not find user with id- " + id);
        }
        return userDTO;
    }

    @Override
    @Transactional
    public UserDTO saveUser(User user) {
        try {
            User savedEntity = userRepository.save(user);
            return UserDTO.convertEntityToDto(savedEntity);
        } catch (PersistenceException ex) {
            throw new PersistenceException(ex.getMessage());
        }
    }

    @Override
    public UserDTO getUserByEmailAndPassword(LoginDTO loginDTO) throws UserNotFoundException{
        Optional<User> user = userRepository.findByEmailAndPassword(loginDTO.getEmail(),loginDTO.getPassword());
        if(user.isEmpty()){
            throw new UserNotFoundException("Invalid email and password");
        }
        return UserDTO.convertEntityToDto(user.get());
    }

    @Override
    @Transactional
    public UserDTO getUserByEmail(String email) {
        return userRepository.findByEmail(email)
                .map(UserDTO::convertEntityToDto)
                .orElseThrow(() -> new UserNotFoundException("Did not find user with email- " + email));
    }

}
