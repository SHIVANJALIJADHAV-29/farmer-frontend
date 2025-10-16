package com.uday.farmerNew.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Farmer {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    @Column(unique = true)
    private String email;

    private String password;
    private String role;
    
    @Column(unique = true)
    private String farmerPhone;
    
    private String farmerAddress;
    private String farmerPincode;
    private String farmerState;
    private String farmerDistrict;
    private String farmerTaluka;
    private double farmerFarmSizeInAcres;
    private String farmerCrops;
    private String farmerCategories;
}
