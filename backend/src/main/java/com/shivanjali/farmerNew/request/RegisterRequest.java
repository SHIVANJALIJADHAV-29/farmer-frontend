	package com.uday.farmerNew.request;
	
	import lombok.AllArgsConstructor;
	import lombok.Data;
	import lombok.NoArgsConstructor;
	
	//RegisterRequest.java
	@Data
	@AllArgsConstructor
	@NoArgsConstructor
	public class RegisterRequest {
		private String name;
		private String email;
		private String password;
		private String role;
	
		// Farmer fields
		private String farmerPhone;
		private String farmerAddress;
		private String farmerPincode;
		private String farmerState;
		private String farmerDistrict;
		private String farmerTaluka;
		private double farmerFarmSizeInAcres;
		private String farmerCrops;
		private String farmerCategories;
	
		// Customer fields
		private String customerPhone;
		private String customerAddress;
		private String customerPincode;
		private String customerState;
		private String customerDistrict;
		private String customerTaluka;
	}
