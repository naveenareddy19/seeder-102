package com.bc102.seeder.paymentsservice.entity;


import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "payments")
public class Payments {
    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    @Column(name="id")
    private int id;

    @Column(name = "status")
    private String status;

    @Column(name = "due_date")
    private LocalDate dueDate;

    @Column(name = "expected_amount")
    private double expectedAmount;

    @Column(name = "outstanding")
    private double outstanding;

    @Column(name = "user_id")
    private int userId;
}
