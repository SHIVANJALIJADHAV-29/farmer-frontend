package com.uday.farmerNew.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class OrderItemResponse {
    private Long id;
    private Long productId;
    private String productName;
    private int quantity;
    private Double price;
    private Long farmerId; // Include farmer ID if relevant for the response
    private String farmerName; // Include farmer name if relevant for the response
}