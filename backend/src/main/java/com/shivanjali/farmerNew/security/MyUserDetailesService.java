package com.uday.farmerNew.security;

import java.util.Collections;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.uday.farmerNew.entity.Admin;
import com.uday.farmerNew.entity.Customer;
import com.uday.farmerNew.entity.Farmer;
import com.uday.farmerNew.repository.AdminRepository;
import com.uday.farmerNew.repository.CustomerRepository;
import com.uday.farmerNew.repository.FarmerRepository;

@Service
public class MyUserDetailesService implements UserDetailsService {

	@Autowired
	private AdminRepository adminRepo;

	@Autowired
	private FarmerRepository farmerRepo;

	@Autowired
	private CustomerRepository customerRepo;

	@Override
	public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
		Admin admin = adminRepo.findByEmail(email).orElse(null);
		if (admin != null) {
			return new User(admin.getEmail(), admin.getPassword(),
					Collections.singletonList(new SimpleGrantedAuthority("ADMIN")));
		}

		Farmer farmer = farmerRepo.findByEmail(email).orElse(null);
		if (farmer != null) {
			return new User(farmer.getEmail(), farmer.getPassword(),
					Collections.singletonList(new SimpleGrantedAuthority("FARMER")));
		}

		Customer customer = customerRepo.findByEmail(email).orElse(null);
		if (customer != null) {
			return new User(customer.getEmail(), customer.getPassword(),
					Collections.singletonList(new SimpleGrantedAuthority("CUSTOMER")));
		}

		throw new UsernameNotFoundException("User not found with email: " + email);
	}

}
