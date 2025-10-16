package com.uday.farmerNew.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor 
public class ProductResponse {
    private Long id;
    private String name;
    private String category;
    private double quantity;
    private double price;
    private String image;
    
    // Farmer information
    private Long farmerId;
    private String farmerName;
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