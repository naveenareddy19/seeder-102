package com.bc102.seeder.userservice.service;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

import com.bc102.seeder.userservice.dto.LoginDTO;
import com.bc102.seeder.userservice.dto.UserDTO;
import com.bc102.seeder.userservice.entity.User;
import com.bc102.seeder.userservice.exceptions.UserNotFoundException;
import com.bc102.seeder.userservice.repository.UserRepository;
import jakarta.persistence.PersistenceException;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import java.util.Optional;

class UserServiceImplTest {

    @Mock
    private UserRepository userRepository;

    @InjectMocks
    private UserServiceImpl userService;

    @BeforeEach
    public void setUp() {
        MockitoAnnotations.initMocks(this);
    }

    @Test
    void testGetUserById_Success() {
        Long userId = 1L;
        User user = new User();
        user.setId(userId);
        when(userRepository.findById(userId)).thenReturn(Optional.of(user));

        UserDTO userDTO = userService.getUserById(userId);

        assertNotNull(userDTO);
        assertEquals(userId, userDTO.getId());
    }

    @Test
    void testGetUserById_UserNotFound() {
        Long userId = 1L;
        when(userRepository.findById(userId)).thenReturn(Optional.empty());

        assertThrows(UserNotFoundException.class, () -> userService.getUserById(userId));
    }

    @Test
    void testSaveUser_Success() {
        User user = new User();
        when(userRepository.save(user)).thenReturn(user);

        UserDTO userDTO = userService.saveUser(user);

        assertNotNull(userDTO);
    }

    @Test
    void testSaveUser_PersistenceException() {
        User user = new User();
        when(userRepository.save(any(User.class))).thenThrow(PersistenceException.class);

        assertThrows(PersistenceException.class, () -> userService.saveUser(user));
    }

    @Test
    void testGetUserByEmail_Success() {
        String email = "test@example.com";
        User user = new User();
        user.setEmail(email);
        when(userRepository.findByEmail(email)).thenReturn(Optional.of(user));

        UserDTO userDTO = userService.getUserByEmail(email);

        assertNotNull(userDTO);
        assertEquals(email, userDTO.getEmail());
    }

    @Test
    void testGetUserByEmail_UserNotFound() {
        String email = "test@example.com";
        when(userRepository.findByEmail(email)).thenReturn(Optional.empty());

        assertThrows(UserNotFoundException.class, () -> userService.getUserByEmail(email));
    }

    @Test
    void testGetUserByEmailAndPassword_ValidCredentials() throws UserNotFoundException {
        LoginDTO loginDTO = new LoginDTO();
        loginDTO.setEmail("test@example.com");
        loginDTO.setPassword("password");

        User user = new User();
        user.setId(1L);
        user.setEmail("test@example.com");
        user.setPassword("password");

        when(userRepository.findByEmailAndPassword(loginDTO.getEmail(), loginDTO.getPassword())).thenReturn(Optional.of(user));

        UserDTO result = userService.getUserByEmailAndPassword(loginDTO);

        assertEquals(user.getId(), result.getId());
        assertEquals(user.getEmail(), result.getEmail());
        assertEquals(user.getPassword(), result.getPassword());

        verify(userRepository, times(1)).findByEmailAndPassword(loginDTO.getEmail(),loginDTO.getPassword());
    }

    @Test
    void testGetUserByEmailAndPassword_InvalidCredentials() {
        LoginDTO loginDTO = new LoginDTO();
        loginDTO.setEmail("test@example.com");
        loginDTO.setPassword("password");

        when(userRepository.findByEmailAndPassword(loginDTO.getEmail(),loginDTO.getPassword())).thenReturn(Optional.empty());

        // Act & Assert
        assertThrows(UserNotFoundException.class, () -> userService.getUserByEmailAndPassword(loginDTO));

        verify(userRepository, times(1)).findByEmailAndPassword(loginDTO.getEmail(), loginDTO.getPassword());
    }
}
