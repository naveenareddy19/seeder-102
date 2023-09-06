package com.bc102.seeder.contractservice.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
@Table(name = "contract")
public class Contract {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private int id;
    @Column(name = "name")
    private String name;

    @Column(name = "type")
    private String type;

    @Column(name = "per_payment")
    private double perPayment;

    @Column(name = "term_length")
    private int termLength;

    @Column(name = "term_fee")
    private double termFee;

    @Column(name = "payment")
    private double paymentAmount;

    @Column(name = "status")
    private String status;
}
