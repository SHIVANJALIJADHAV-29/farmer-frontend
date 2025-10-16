package com.uday.farmerNew.request;

import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class OrderRequest {
    private Long customerId;
    private String deliveryAddress;
    private String paymentMethod;
    private double totalAmount;
    private List<OrderItemRequest> items;
}
