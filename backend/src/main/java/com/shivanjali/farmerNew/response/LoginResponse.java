package com.uday.farmerNew.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor 
@AllArgsConstructor
public class LoginResponse {
	private boolean success;
	private String role;
	private String name;
}
