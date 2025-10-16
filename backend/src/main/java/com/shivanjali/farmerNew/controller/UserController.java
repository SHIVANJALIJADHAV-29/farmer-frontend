package com.uday.farmerNew.controller;

import java.io.IOException;
import java.util.Base64;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.uday.farmerNew.entity.Customer;
import com.uday.farmerNew.entity.CustomerOrder;
import com.uday.farmerNew.entity.Farmer;
import com.uday.farmerNew.entity.Product;
import com.uday.farmerNew.repository.CustomerOrderRepository;
import com.uday.farmerNew.repository.ProductRepository;
import com.uday.farmerNew.request.LoginRequest;
import com.uday.farmerNew.request.OrderRequest;
import com.uday.farmerNew.request.ProductRequest;
import com.uday.farmerNew.request.RegisterRequest;
import com.uday.farmerNew.request.StatusUpdateRequest;
import com.uday.farmerNew.response.CustomerOrderResponse;
import com.uday.farmerNew.response.LoginResponse;
import com.uday.farmerNew.response.OrderItemResponse;
import com.uday.farmerNew.response.ProductResponse;
import com.uday.farmerNew.response.ProfitSummaryResponse;
import com.uday.farmerNew.service.OrderService;
import com.uday.farmerNew.service.UserService;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
public class UserController {
	@Autowired
	UserService userService;
	@Autowired
	ProductRepository productRepository;

	// UserController.java
	@PostMapping("/addUser")
	public void addUser(@RequestBody RegisterRequest request) {
		userService.addUser(request.getName(), request.getEmail(), request.getPassword(), request.getRole(),
				request.getFarmerPhone(), request.getFarmerAddress(), request.getFarmerPincode(),
				request.getFarmerState(), request.getFarmerDistrict(), request.getFarmerTaluka(),
				request.getFarmerFarmSizeInAcres(), request.getFarmerCrops(), request.getFarmerCategories(),
				request.getCustomerPhone(), request.getCustomerAddress(), request.getCustomerPincode(),
				request.getCustomerState(), request.getCustomerDistrict(), request.getCustomerTaluka());
	}

	@PostMapping("/loginUser")
	public LoginResponse loginUser(@RequestBody LoginRequest loginRequest) {
		return userService.loginUser(loginRequest);
	}

	@GetMapping("/getFarmer/{email}")
	public Farmer getFarmerByEmail(@PathVariable String email) {
		return userService.getFarmerByEmail(email);
	}

	@PutMapping("/updateFarmer/{email}")
	public Farmer updateFarmer(@PathVariable String email, @RequestBody RegisterRequest request) {
		return userService.updateFarmer(email, request);
	}

	@PostMapping("/addProduct")
	public ResponseEntity<String> addProduct(@ModelAttribute ProductRequest productRequest) throws IOException {
		userService.addProduct(productRequest);
		return ResponseEntity.ok("Product saved successfully");
	}

	@GetMapping("/getProducts")
	public ResponseEntity<List<ProductResponse>> getProducts(@RequestParam String email) {
		List<Product> products = userService.getProductsByEmail(email);
		List<ProductResponse> responses = products.stream().map(product -> {
			ProductResponse res = new ProductResponse();
			res.setId(product.getId());
			res.setName(product.getName());
			res.setCategory(product.getCategory());
			res.setQuantity(product.getQuantity());
			res.setPrice(product.getPrice());

			if (product.getImage() != null) {
				String base64Image = Base64.getEncoder().encodeToString(product.getImage());
				res.setImage(base64Image);
			}

			return res;
		}).collect(Collectors.toList());

		return ResponseEntity.ok(responses);
	}

	@PutMapping("/updateProduct/{id}")
	public ResponseEntity<String> updateProduct(@PathVariable Long id, @RequestParam String name,
			@RequestParam String category, @RequestParam String quantity, @RequestParam String price,
			@RequestParam(required = false) MultipartFile image) {
		return userService.updateProduct(id, name, category, quantity, price, image);
	}

	@DeleteMapping("/deleteProduct/{id}")
	public ResponseEntity<String> deleteProduct(@PathVariable Long id) {
		return userService.deleteProduct(id);
	}

	// UserController.java
	@GetMapping("/getCustomer/{email}")
	public Customer getCustomerByEmail(@PathVariable String email) {
		return userService.getCustomerByEmail(email);
	}

	@PutMapping("/updateCustomer/{email}")
	public Customer updateCustomer(@PathVariable String email, @RequestBody RegisterRequest request) {
		return userService.updateCustomer(email, request);
	}

	@GetMapping("/getAllProducts")
	public ResponseEntity<List<ProductResponse>> getAllProducts() {
		List<Product> products = productRepository.findAll();
		List<ProductResponse> responses = products.stream().map(product -> {
			ProductResponse res = new ProductResponse();
			Farmer farmer = product.getFarmer();

			// Product information
			res.setId(product.getId());
			res.setName(product.getName());
			res.setCategory(product.getCategory());
			res.setQuantity(product.getQuantity());
			res.setPrice(product.getPrice());

			res.setFarmerId(farmer.getId()); // <--- This is the crucial addition
			// Farmer information
			res.setFarmerName(farmer.getName());
			res.setFarmerPhone(farmer.getFarmerPhone());
			res.setFarmerAddress(farmer.getFarmerAddress());
			res.setFarmerPincode(farmer.getFarmerPincode());
			res.setFarmerState(farmer.getFarmerState());
			res.setFarmerDistrict(farmer.getFarmerDistrict());
			res.setFarmerTaluka(farmer.getFarmerTaluka());
			res.setFarmerFarmSizeInAcres(farmer.getFarmerFarmSizeInAcres());
			res.setFarmerCrops(farmer.getFarmerCrops());
			res.setFarmerCategories(farmer.getFarmerCategories());

			if (product.getImage() != null) {
				String base64Image = Base64.getEncoder().encodeToString(product.getImage());
				res.setImage(base64Image);
			}

			return res;
		}).collect(Collectors.toList());

		return ResponseEntity.ok(responses);
	}

	@Autowired
	private OrderService orderService;

	@PostMapping("/placeOrder")
	public ResponseEntity<String> placeOrder(@RequestBody OrderRequest request) {
		orderService.placeOrder(request);
		return ResponseEntity.ok("Order placed successfully!");
	}

	@GetMapping("/getOrders/{customerId}") // Your requested endpoint
	public ResponseEntity<List<CustomerOrderResponse>> getOrdersByCustomerId(@PathVariable Long customerId) {
		List<CustomerOrderResponse> orders = orderService.getOrdersByCustomerId(customerId);
		if (orders.isEmpty()) {
			return ResponseEntity.noContent().build(); // Or ResponseEntity.notFound() if no customer or orders
		}
		return ResponseEntity.ok(orders);
	}

	@GetMapping("/farmer/orders/{farmerId}")
	public ResponseEntity<List<CustomerOrderResponse>> getFarmerOrders(@PathVariable Long farmerId) {
		List<CustomerOrderResponse> orders = orderService.getOrdersForFarmer(farmerId);
		if (orders.isEmpty()) {
			return ResponseEntity.noContent().build();
		}
		return ResponseEntity.ok(orders);
	}

	@PutMapping("/farmer/orders/confirm/{orderItemId}")
	public ResponseEntity<String> confirmFarmerOrderItem(@PathVariable Long orderItemId) {
		boolean confirmed = orderService.confirmOrderItem(orderItemId);
		if (confirmed) {
			return ResponseEntity.ok("Order item confirmed by farmer successfully!");
		} else {
			return ResponseEntity.notFound().build();
		}
	}

	@GetMapping("/getAllFarmers")
	public List<Farmer> getAllFarmers() {
		return userService.getAllFarmers();
	}
	@DeleteMapping("/deleteFarmer/{id}")
    public ResponseEntity<String> deleteFarmer(@PathVariable Long id) {
        try {
            userService.deleteFarmer(id);
            return ResponseEntity.ok("Farmer deleted successfully");
        } catch (RuntimeException e) {
            return ResponseEntity.status(404).body(e.getMessage());
        }
    }
	@GetMapping("/getAllCustomer")
	public List<Customer> getAllCustomer() {
		return userService.getAllCustomer();
	}

	@DeleteMapping("/deleteCustomer/{id}")
    public ResponseEntity<String> deleteCustomer(@PathVariable int id) {
        try {
            userService.deleteCustomer(id);
            return ResponseEntity.ok("Customer deleted successfully");
        } catch (RuntimeException e) {
            return ResponseEntity.status(404).body(e.getMessage());
        }
    }

	@GetMapping("/getAllCustomerOrders")
	public List<CustomerOrderResponse> getAllCustomerOrders() {
		List<CustomerOrder> customerOrders = orderService.getAllCustomerOrders();

		return customerOrders.stream().map(order -> {
			CustomerOrderResponse response = new CustomerOrderResponse();
			response.setId(order.getId());
			response.setCustomerId(order.getCustomerId());
			response.setDeliveryAddress(order.getDeliveryAddress());
			response.setPaymentMethod(order.getPaymentMethod());
			response.setQuantity(order.getQuantity());
			response.setPrice(order.getPrice());
			response.setOrderDate(order.getOrderDate());
			response.setDeliveryStatus(order.getDeliveryStatus());

			List<OrderItemResponse> itemResponses = order.getItems().stream().map(item -> {
				OrderItemResponse itemResponse = new OrderItemResponse();
				itemResponse.setId(item.getId());
				itemResponse.setProductId(item.getProductId());
				itemResponse.setProductName(item.getProductName());
				itemResponse.setQuantity(item.getQuantity());
				itemResponse.setPrice(item.getPrice());
				itemResponse.setFarmerId(item.getFarmer().getId());
				itemResponse.setFarmerName(item.getFarmer().getName());
				return itemResponse;
			}).collect(Collectors.toList());

			response.setItems(itemResponses);
			return response;
		}).collect(Collectors.toList());
	}

	@Autowired
	private CustomerOrderRepository customerOrderRepository;

	@PutMapping("/updateOrderStatus/{orderId}")
	public ResponseEntity<String> updateOrderStatus(@PathVariable Long orderId,
			@RequestBody StatusUpdateRequest request) {
		Optional<CustomerOrder> optionalOrder = customerOrderRepository.findById(orderId);

		if (optionalOrder.isPresent()) {
			CustomerOrder order = optionalOrder.get();
			order.setDeliveryStatus(request.getDeliveryStatus());
			customerOrderRepository.save(order);
			return ResponseEntity.ok("Order status updated to: " + request.getDeliveryStatus());
		} else {
			return ResponseEntity.badRequest().body("Order not found with ID: " + orderId);
		}
	}

	@GetMapping("/admin/profit-summary")
	public ResponseEntity<List<ProfitSummaryResponse>> getProfitSummary() {
		return ResponseEntity.ok(orderService.getProfitSummary());
	}

}
