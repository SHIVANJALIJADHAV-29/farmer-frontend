package com.uday.farmerNew.entity;

import java.time.LocalDate;
import java.util.List;

import jakarta.persistence.*;
import lombok.*;

@Data
@Entity
@NoArgsConstructor
@AllArgsConstructor
public class CustomerOrder {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	private Long customerId;
	private String deliveryAddress;
	private String paymentMethod;

	@Column(nullable = false)
	private int quantity;

	@Column(nullable = false)
	private Double price;

	private LocalDate orderDate = LocalDate.now();
	@Column(nullable = false)
	private String deliveryStatus = "Pending"; // 👈 New column added

	@OneToMany(mappedBy = "order", cascade = CascadeType.ALL, orphanRemoval = true)
	private List<OrderItems> items;
}
