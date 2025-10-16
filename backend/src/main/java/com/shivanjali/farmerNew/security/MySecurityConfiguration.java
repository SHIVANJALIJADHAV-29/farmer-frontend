package com.uday.farmerNew.security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
public class MySecurityConfiguration {
	@Bean
	public AuthenticationManager authenticationManager(AuthenticationConfiguration config) throws Exception {
		return config.getAuthenticationManager();
	}

	@Bean
	public PasswordEncoder myPassword() {
		return new BCryptPasswordEncoder();
	}

	@Bean
	public DaoAuthenticationProvider authenticationProvider() {
		DaoAuthenticationProvider authProvider = new DaoAuthenticationProvider();
		authProvider.setUserDetailsService(myUserDetails());
		authProvider.setPasswordEncoder(myPassword());
		return authProvider;
	}

	@Bean
	public UserDetailsService myUserDetails() {
		return new MyUserDetailesService(); 
	}

	@Bean
	public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
		http.csrf(csrf -> csrf.disable())
		.cors(Customizer.withDefaults())
		.authorizeHttpRequests(auth ->
		auth.requestMatchers
		       ("/addUser", "/loginUser",
		        "/getFarmer/**","/updateFarmer/**",
		        "/addProduct","/getProducts",
				"/deleteProduct/**","/updateProduct/**",
				"/getCustomer/**","/updateCustomer/**",
				"/getAllProducts",
				"/placeOrder","/getOrders/**",
				"/farmer/**",
				"/getAllFarmers","/getAllCustomer",
				"/getAllCustomerOrders",
				"/updateOrderStatus/**",
				"/admin/**",
				"/deleteCustomer/**","/deleteFarmer/**")
						.permitAll()
						.anyRequest()
						.authenticated())
				.httpBasic(Customizer.withDefaults())
				.formLogin(form -> form.disable()); 

		return http.build();
	}

}
