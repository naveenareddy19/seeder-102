package com.bc102.seeder.cashkickservice.service;

import com.bc102.seeder.cashkickservice.dto.CashKickDTO;
import com.bc102.seeder.cashkickservice.entity.CashKick;
import com.bc102.seeder.cashkickservice.repository.CashKickRepository;
import jakarta.persistence.PersistenceException;
import org.junit.Rule;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.mockito.junit.MockitoJUnit;
import org.mockito.junit.MockitoRule;

import java.util.ArrayList;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

class CashKickServiceImplTest {
    @Rule
    public MockitoRule mockitoRule= MockitoJUnit.rule();

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Mock
    private CashKickRepository cashKickRepository;

    @InjectMocks
    private CashKickServiceImpl cashKickService;

    @Test
    void testSave() {
        CashKickDTO cashKickDTO = new CashKickDTO();
        CashKick cashKickEntity = CashKickDTO.convertDtoToEntity(cashKickDTO);

        when(cashKickRepository.save(any(CashKick.class))).thenReturn(cashKickEntity);

        CashKickDTO result = cashKickService.save(cashKickDTO);

        verify(cashKickRepository, times(1)).save(any(CashKick.class));
    }


    @Test
    void testFindAllByUserId() {
        int userId = 1; // Provide a user ID
        List<CashKick> cashKickEntities = new ArrayList<>(); // Initialize as needed
        when(cashKickRepository.findByUserId(userId)).thenReturn(cashKickEntities);

        List<CashKickDTO> result = cashKickService.findAllByUserId(userId);

        assertEquals(cashKickEntities.size(), result.size());

        verify(cashKickRepository, times(1)).findByUserId(userId);
    }

    @Test
    void testSaveCashKick_PersistenceException() {
        CashKickDTO cashKickDTO = new CashKickDTO();
        when(cashKickRepository.save(any(CashKick.class))).thenThrow(PersistenceException.class);
        assertThrows(PersistenceException.class, () -> cashKickService.save(cashKickDTO));
    }
}