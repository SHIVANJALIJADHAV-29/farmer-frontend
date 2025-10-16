package com.uday.farmerNew.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

//Customer.java
@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Customer {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;

	private String name;

	@Column(unique = true)
	private String email;
	private String password;
	private String role;

	// Add these new fields
	@Column(unique = true)
	private String customerPhone;
	private String customerAddress;
	private String customerPincode;
	private String customerState;
	private String customerDistrict;
	private String customerTaluka;
}