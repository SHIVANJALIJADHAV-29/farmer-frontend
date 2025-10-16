package com.uday.farmerNew.service;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.uday.farmerNew.entity.Admin;
import com.uday.farmerNew.entity.Customer;
import com.uday.farmerNew.entity.Farmer;
import com.uday.farmerNew.entity.Product;
import com.uday.farmerNew.repository.AdminRepository;
import com.uday.farmerNew.repository.CustomerOrderRepository;
import com.uday.farmerNew.repository.CustomerRepository;
import com.uday.farmerNew.repository.FarmerRepository;
import com.uday.farmerNew.repository.ProductRepository;
import com.uday.farmerNew.request.LoginRequest;
import com.uday.farmerNew.request.ProductRequest;
import com.uday.farmerNew.request.RegisterRequest;
import com.uday.farmerNew.response.LoginResponse;

@Service
public class UserService {

	@Autowired
	private FarmerRepository farmerRepository;

	@Autowired
	private CustomerRepository customerRepository;

	@Autowired
	private AdminRepository adminRepository;

	@Autowired
	private PasswordEncoder passwordEncoder;

	@Autowired
	private ProductRepository productRepository;

	@Autowired
	private CustomerOrderRepository customerOrderRepository;

	// ✅ Add new user (Farmer or Customer)
	// In UserService.java, update the addUser method:
	public void addUser(String name, String email, String password, String role, String farmerPhone,
			String farmerAddress, String farmerPincode, String farmerState, String farmerDistrict, String farmerTaluka,
			double farmerFarmSizeInAcres, String farmerCrops, String farmerCategories, String customerPhone,
			String customerAddress, String customerPincode, String customerState, String customerDistrict,
			String customerTaluka) {

		String encodedPassword = passwordEncoder.encode(password);

		if (role.equalsIgnoreCase("FARMER")) {
			Optional<Farmer> existing = farmerRepository.findByEmail(email);
			if (existing.isPresent()) {
				throw new RuntimeException("Farmer with this email already exists");
			}
			Optional<Farmer> existingByPhone = farmerRepository.findByFarmerPhone(farmerPhone);
			if (existingByPhone.isPresent()) {
				throw new RuntimeException("Farmer with this phone number already exists");
			}

			Farmer farmer = new Farmer();
			farmer.setName(name);
			farmer.setEmail(email);
			farmer.setPassword(encodedPassword);
			farmer.setRole("FARMER");
			farmer.setFarmerPhone(farmerPhone);
			farmer.setFarmerAddress(farmerAddress);
			farmer.setFarmerPincode(farmerPincode);
			farmer.setFarmerState(farmerState);
			farmer.setFarmerDistrict(farmerDistrict);
			farmer.setFarmerTaluka(farmerTaluka);
			farmer.setFarmerFarmSizeInAcres(farmerFarmSizeInAcres);
			farmer.setFarmerCrops(farmerCrops);
			farmer.setFarmerCategories(farmerCategories);

			farmerRepository.save(farmer);

		} else if (role.equalsIgnoreCase("CUSTOMER")) {
			Optional<Customer> existing = customerRepository.findByEmail(email);
			if (existing.isPresent()) {
				throw new RuntimeException("Customer with this email already exists");
			}
			Optional<Customer> existingByPhone = customerRepository.findByCustomerPhone(customerPhone);
			if (existingByPhone.isPresent()) {
				throw new RuntimeException("Customer with this phone number already exists");
			}

			Customer customer = new Customer();
			customer.setName(name);
			customer.setEmail(email);
			customer.setPassword(encodedPassword);
			customer.setRole("CUSTOMER");
			customer.setCustomerPhone(customerPhone);
			customer.setCustomerAddress(customerAddress);
			customer.setCustomerPincode(customerPincode);
			customer.setCustomerState(customerState);
			customer.setCustomerDistrict(customerDistrict);
			customer.setCustomerTaluka(customerTaluka);

			customerRepository.save(customer);
		}

	}

	// ✅ Login handling
	public LoginResponse loginUser(LoginRequest loginRequest) {
		String email = loginRequest.getEmail();
		String rawPassword = loginRequest.getPassword();
		String role = loginRequest.getRole();

		if (role.equalsIgnoreCase("FARMER")) {
			Optional<Farmer> farmerOpt = farmerRepository.findByEmail(email);
			if (farmerOpt.isPresent()) {
				Farmer farmer = farmerOpt.get();
				if (passwordEncoder.matches(rawPassword, farmer.getPassword())
						&& farmer.getRole().equalsIgnoreCase(role)) {
					return new LoginResponse(true, "FARMER", farmer.getName());
				}
			}

		} else if (role.equalsIgnoreCase("CUSTOMER")) {
			Optional<Customer> customerOpt = customerRepository.findByEmail(email);
			if (customerOpt.isPresent()) {
				Customer customer = customerOpt.get();
				if (passwordEncoder.matches(rawPassword, customer.getPassword())
						&& customer.getRole().equalsIgnoreCase(role)) {
					return new LoginResponse(true, "CUSTOMER", customer.getName());
				}
			}

		} else if (role.equalsIgnoreCase("ADMIN")) {
			Optional<Admin> adminOpt = adminRepository.findByEmail(email);
			if (adminOpt.isPresent()) {
				Admin admin = adminOpt.get();
				if (passwordEncoder.matches(rawPassword, admin.getPassword())
						&& admin.getRole().equalsIgnoreCase(role)) {
					return new LoginResponse(true, "ADMIN", admin.getName());
				}
			}
		}

		return new LoginResponse(false, "", "");
	}

	public Farmer getFarmerByEmail(String email) {
		return farmerRepository.findByEmail(email)
				.orElseThrow(() -> new RuntimeException("Farmer not found with email: " + email));
	}

	public Farmer updateFarmer(String email, RegisterRequest request) {
		Farmer farmer = farmerRepository.findByEmail(email)
				.orElseThrow(() -> new RuntimeException("Farmer not found with email: " + email));

		// Update fields
		farmer.setName(request.getName());
		farmer.setFarmerPhone(request.getFarmerPhone());
		farmer.setFarmerAddress(request.getFarmerAddress());
		farmer.setFarmerState(request.getFarmerState());
		farmer.setFarmerDistrict(request.getFarmerDistrict());
		farmer.setFarmerTaluka(request.getFarmerTaluka());
		farmer.setFarmerFarmSizeInAcres(request.getFarmerFarmSizeInAcres());
		farmer.setFarmerCategories(request.getFarmerCategories());
		farmer.setFarmerCrops(request.getFarmerCrops());

		return farmerRepository.save(farmer);
	}

	public void addProduct(ProductRequest request) throws IOException {
		Farmer farmer = farmerRepository.findByEmail(request.getEmail())
				.orElseThrow(() -> new RuntimeException("Farmer not found"));

		Product product = new Product();
		product.setName(request.getName());
		product.setCategory(request.getCategory());
		product.setQuantity(request.getQuantity());
		product.setPrice(request.getPrice());
		product.setImage(request.getImage().getBytes());
		product.setFarmer(farmer);

		productRepository.save(product);
	}

	public List<Product> getProductsByEmail(String email) {
		Farmer farmer = farmerRepository.findByEmail(email).orElseThrow(() -> new RuntimeException("Farmer not found"));
		return productRepository.findByFarmer(farmer);
	}

	public ResponseEntity<String> updateProduct(Long id, String name, String category, String quantity, String price,
			MultipartFile image) {
		Optional<Product> optional = productRepository.findById(id);
		if (optional.isEmpty()) {
			return ResponseEntity.notFound().build();
		}

		Product product = optional.get();
		product.setName(name);
		product.setCategory(category);
		product.setQuantity(Double.parseDouble(quantity));
		product.setPrice(Double.parseDouble(price));

		if (image != null && !image.isEmpty()) {
			try {
				product.setImage(image.getBytes());
			} catch (IOException e) {
				return ResponseEntity.status(500).body("Image processing failed");
			}
		}

		productRepository.save(product);
		return ResponseEntity.ok("Product updated successfully");
	}

	public ResponseEntity<String> deleteProduct(Long id) {
		if (!productRepository.existsById(id)) {
			return ResponseEntity.notFound().build();
		}

		productRepository.deleteById(id);
		return ResponseEntity.ok("Product deleted successfully");
	}

	// UserService.java
	public Customer getCustomerByEmail(String email) {
		return customerRepository.findByEmail(email)
				.orElseThrow(() -> new RuntimeException("Customer not found with email: " + email));
	}

	public Customer updateCustomer(String email, RegisterRequest request) {
		Customer customer = customerRepository.findByEmail(email)
				.orElseThrow(() -> new RuntimeException("Customer not found with email: " + email));

		// Update fields
		customer.setName(request.getName());
		customer.setCustomerPhone(request.getCustomerPhone());
		customer.setCustomerAddress(request.getCustomerAddress());
		customer.setCustomerState(request.getCustomerState());
		customer.setCustomerDistrict(request.getCustomerDistrict());
		customer.setCustomerTaluka(request.getCustomerTaluka());

		return customerRepository.save(customer);
	}

	public List<Farmer> getAllFarmers() {
		return farmerRepository.findAll();
	}

	public List<Customer> getAllCustomer() {
		return customerRepository.findAll();
	}

	public void deleteCustomer(int id) {
		if (customerRepository.existsById(id)) {
			customerRepository.deleteById(id);
		} else {
			throw new RuntimeException("Customer not found with ID: " + id);
		}
	}

	public void deleteFarmer(Long id) {
		if (farmerRepository.existsById(id)) {
			farmerRepository.deleteById(id);
		} else {
			throw new RuntimeException("Farmer not found with ID: " + id);

		}
	}
}
