package com.bc102.seeder.userservice.controller;

import com.bc102.seeder.userservice.config.JWTGenerator;
import com.bc102.seeder.userservice.dto.LoginDTO;
import com.bc102.seeder.userservice.dto.UserDTO;
import com.bc102.seeder.userservice.entity.User;
import com.bc102.seeder.userservice.exceptions.UserNotFoundException;
import com.bc102.seeder.userservice.service.UserService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/users")
@Slf4j
public class UserController {
    @Autowired
    private UserService userService;

    @Autowired
    private JWTGenerator jwtGenerator;

    @PostMapping("/save")
    public ResponseEntity<UserDTO> saveUser(@RequestBody User user) {
        UserDTO savedUser = userService.saveUser(user);
        return new ResponseEntity<>(savedUser, HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<UserDTO> getUserById(@PathVariable("id") Long id) {
        try {
            UserDTO user = userService.getUserById(id);
            return new ResponseEntity<>(user, HttpStatus.OK);
        } catch (UserNotFoundException ex) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/")
    public ResponseEntity<UserDTO> getUserByEmail(@RequestParam("email") String email){
        UserDTO user = userService.getUserByEmail(email);
        return new ResponseEntity<>(user, HttpStatus.OK);
    }

    @PutMapping("/")
    public ResponseEntity<UserDTO> updateUser(@RequestBody User user) {
        UserDTO updatedUser = userService.saveUser(user);
        return new ResponseEntity<>(updatedUser, HttpStatus.OK);
    }

    @PostMapping("/login")
    public ResponseEntity<?> loginUser(@RequestBody LoginDTO loginDTO) {
        try {
            if(loginDTO.getEmail() == null || loginDTO.getPassword() == null) {
                throw new UserNotFoundException("UserName or Password is Empty");
            }
            UserDTO userData = userService.getUserByEmailAndPassword(loginDTO);
            if(userData == null){
                throw new UserNotFoundException("UserName or Password is Invalid");
            }
            return new ResponseEntity<>(jwtGenerator.generateToken(loginDTO), HttpStatus.OK);
        } catch (UserNotFoundException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.CONFLICT);
        }
    }
}

