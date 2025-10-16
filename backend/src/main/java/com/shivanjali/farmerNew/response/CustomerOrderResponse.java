package com.uday.farmerNew.response;

import java.time.LocalDate;
import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CustomerOrderResponse {
    private Long id;
    private Long customerId;
    private String deliveryAddress;
    private String paymentMethod;
    private int quantity; // Total quantity of items in the order
    private Double price; // Total price/amount of the order
    private LocalDate orderDate;
    private String deliveryStatus;
    private List<OrderItemResponse> items; // List of order items for this order
}