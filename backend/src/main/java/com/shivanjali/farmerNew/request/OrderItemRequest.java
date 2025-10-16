package com.uday.farmerNew.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class OrderItemRequest {
    private Long productId;
    private String productName;
    private Long farmerId;
    private int quantity;
    private Double price; // ✅ use Double instead of double
}
