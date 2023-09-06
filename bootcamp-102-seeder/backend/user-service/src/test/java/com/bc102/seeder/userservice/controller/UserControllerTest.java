package com.bc102.seeder.userservice.controller;

import static org.mockito.Mockito.*;

import com.bc102.seeder.userservice.config.JWTGenerator;
import com.bc102.seeder.userservice.dto.LoginDTO;
import com.bc102.seeder.userservice.dto.UserDTO;
import com.bc102.seeder.userservice.entity.User;
import com.bc102.seeder.userservice.exceptions.UserNotFoundException;
import com.bc102.seeder.userservice.service.UserService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.HashMap;
import java.util.Map;

import static org.junit.jupiter.api.Assertions.*;

class UserControllerTest {

    @Mock
    private UserService userService;

    @InjectMocks
    private UserController userController;

    @Mock
    private JWTGenerator jwtGenerator;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.initMocks(this);
    }

    @Test
    void testSaveUser_Success() {
        User user = new User();
        UserDTO savedUserDTO = new UserDTO();
        when(userService.saveUser(user)).thenReturn(savedUserDTO);

        ResponseEntity<UserDTO> response = userController.saveUser(user);

        assertEquals(HttpStatus.CREATED, response.getStatusCode());
        assertNotNull(response.getBody());
        assertEquals(savedUserDTO, response.getBody());
    }

    @Test
    void testGetUserById_Success() {
        Long userId = 1L;
        UserDTO userDTO = new UserDTO();
        when(userService.getUserById(userId)).thenReturn(userDTO);

        ResponseEntity<UserDTO> response = userController.getUserById(userId);

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertNotNull(response.getBody());
        assertEquals(userDTO, response.getBody());
    }

    @Test
    void testGetUserById_UserNotFound() {
        Long userId = 1L;
        when(userService.getUserById(userId)).thenThrow(new UserNotFoundException("User not found"));

        ResponseEntity<UserDTO> response = userController.getUserById(userId);

        assertEquals(HttpStatus.NOT_FOUND, response.getStatusCode());
        assertNull(response.getBody());
    }

    @Test
    void testGetUserByEmail_Success() {
        String email = "test@example.com";
        UserDTO userDTO = new UserDTO();
        when(userService.getUserByEmail(email)).thenReturn(userDTO);

        ResponseEntity<UserDTO> response = userController.getUserByEmail(email);

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertNotNull(response.getBody());
        assertEquals(userDTO, response.getBody());
    }

    @Test
    void testUpdateUser_Success() {
        User user = new User();
        UserDTO updatedUserDTO = new UserDTO();
        when(userService.saveUser(user)).thenReturn(updatedUserDTO);

        ResponseEntity<UserDTO> response = userController.updateUser(user);

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertNotNull(response.getBody());
        assertEquals(updatedUserDTO, response.getBody());
    }

    @Test
    void testLoginUser_EmptyUsernameOrPassword() {
        LoginDTO loginDTO = new LoginDTO();
        loginDTO.setEmail(null);
        loginDTO.setPassword(null);

        ResponseEntity<?> response = userController.loginUser(loginDTO);

        assertEquals(HttpStatus.CONFLICT, response.getStatusCode());
        assertEquals("UserName or Password is Empty", response.getBody());
        verify(userService, never()).getUserByEmailAndPassword(any(LoginDTO.class));
        verify(jwtGenerator, never()).generateToken(any(LoginDTO.class));
    }

    @Test
    void testLoginUser_InvalidUsernameOrPassword() {
        LoginDTO loginDTO = new LoginDTO();
        loginDTO.setEmail("test@example.com");
        loginDTO.setPassword("password");

        when(userService.getUserByEmailAndPassword(loginDTO)).thenReturn(null);

        ResponseEntity<?> response = userController.loginUser(loginDTO);

        assertEquals(HttpStatus.CONFLICT, response.getStatusCode());
        assertEquals("UserName or Password is Invalid", response.getBody());
        verify(userService, times(1)).getUserByEmailAndPassword(loginDTO);
        verify(jwtGenerator, never()).generateToken(any(LoginDTO.class));
    }

    @Test
    void testValidLogin() {
        LoginDTO loginDTO = new LoginDTO("valid@example.com", "password");
        UserDTO validUser = new UserDTO();
        String mockToken = "mockedJWTToken";
        String mockMessage = "Mock JWT Token Generated";
        Map<String, String> mockTokenMap = new HashMap<>();
        mockTokenMap.put("token", mockToken);
        mockTokenMap.put("message", mockMessage);

        when(userService.getUserByEmailAndPassword(loginDTO)).thenReturn(validUser);
        when(jwtGenerator.generateToken(loginDTO)).thenReturn(mockTokenMap);

        ResponseEntity<?> response = userController.loginUser(loginDTO);

        assertEquals(HttpStatus.OK, response.getStatusCode());

        verify(userService, times(1)).getUserByEmailAndPassword(loginDTO);
        verify(jwtGenerator, times(1)).generateToken(loginDTO);
    }
}
