package com.bc102.seeder.contractservice.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "cashkick_contract")
public class SelectedContract {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private int id;

    @Column(name = "partial_amount")
    private double selectedAmount;

    @Column(name = "user_id")
    private int userId;
    @Column(name = "cashkick_id")
    private int cashKickId;

    @Column(name = "contract_id")
    private int contractId;
}
