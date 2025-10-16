package com.uday.farmerNew.service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.uday.farmerNew.entity.CustomerOrder;
import com.uday.farmerNew.entity.Farmer;
import com.uday.farmerNew.entity.OrderItems;
import com.uday.farmerNew.entity.Product;
import com.uday.farmerNew.repository.CustomerOrderRepository;
import com.uday.farmerNew.repository.FarmerRepository;
import com.uday.farmerNew.repository.OrderItemRepository; // Import this
import com.uday.farmerNew.repository.ProductRepository;
import com.uday.farmerNew.request.OrderItemRequest;
import com.uday.farmerNew.request.OrderRequest;
import com.uday.farmerNew.response.CustomerOrderResponse;
import com.uday.farmerNew.response.OrderItemResponse;
import com.uday.farmerNew.response.ProfitSummaryResponse;

@Service
public class OrderService {

	@Autowired
	private CustomerOrderRepository customerOrderRepository; // Renamed from orderRepo for clarity

	@Autowired
	private FarmerRepository farmerRepo;

	@Autowired
	private ProductRepository productRepo;

	@Autowired
	private OrderItemRepository orderItemRepository; // Inject OrderItemRepository

	@Transactional
	public void placeOrder(OrderRequest request) {
		System.out.println("Received order request for customer ID: " + request.getCustomerId());
		System.out.println("Items received: " + request.getItems().size());

		CustomerOrder order = new CustomerOrder();
		order.setCustomerId(request.getCustomerId());
		order.setDeliveryAddress(request.getDeliveryAddress());
		order.setPaymentMethod(request.getPaymentMethod());
		order.setPrice(request.getTotalAmount());
		// deliveryStatus is "Pending" by default when a new order is created

		List<OrderItems> items = new ArrayList<>();
		int totalQuantity = 0;

		for (OrderItemRequest itemReq : request.getItems()) {
			System.out.println("Processing item: " + itemReq.getProductName() + ", Qty: " + itemReq.getQuantity()
					+ ", Price: " + itemReq.getPrice());

			if (itemReq.getPrice() == null || itemReq.getPrice() < 0) {
				throw new IllegalArgumentException("Invalid price for product: " + itemReq.getProductName());
			}

			Optional<Product> optionalProduct = productRepo.findById(itemReq.getProductId());
			if (optionalProduct.isEmpty()) {
				throw new RuntimeException("Product not found with ID: " + itemReq.getProductId());
			}
			Product product = optionalProduct.get();

			Farmer farmer = farmerRepo.findById(itemReq.getFarmerId())
					.orElseThrow(() -> new RuntimeException("Farmer not found with ID: " + itemReq.getFarmerId()));

			if (product.getQuantity() < itemReq.getQuantity()) {
				throw new RuntimeException("Insufficient stock for product: " + product.getName() + ". Available: "
						+ product.getQuantity() + ", Ordered: " + itemReq.getQuantity());
			}

			product.setQuantity(product.getQuantity() - itemReq.getQuantity());
			productRepo.save(product);

			OrderItems item = new OrderItems();
			item.setProductId(itemReq.getProductId());
			item.setProductName(itemReq.getProductName());
			item.setFarmer(farmer);
			item.setQuantity(itemReq.getQuantity());
			item.setPrice(itemReq.getPrice() * (itemReq.getQuantity()));
			item.setOrder(order);

			items.add(item);
			totalQuantity += itemReq.getQuantity();
		}

		order.setItems(items);
		order.setQuantity(totalQuantity);
		customerOrderRepository.save(order); // Use customerOrderRepository
		System.out.println("✅ Order saved successfully with " + items.size() + " items.");
	}

	// Method to retrieve and convert to response objects for a customer
	public List<CustomerOrderResponse> getOrdersByCustomerId(Long customerId) {
		List<CustomerOrder> orders = customerOrderRepository.findByCustomerId(customerId);
		return orders.stream().map(this::mapToCustomerOrderResponse).collect(Collectors.toList());
	}

	/**
	 * Retrieves all orders that contain at least one item from the specified
	 * farmer. For each order, it filters the items to only show those belonging to
	 * the farmer.
	 *
	 * @param farmerId The ID of the farmer.
	 * @return A list of CustomerOrderResponse objects, where each order contains
	 *         only the items relevant to the farmer.
	 */
	public List<CustomerOrderResponse> getOrdersForFarmer(Long farmerId) {
		List<CustomerOrder> allOrders = customerOrderRepository.findByItems_FarmerId(farmerId);

		List<CustomerOrderResponse> farmerOrders = new ArrayList<>();

		for (CustomerOrder order : allOrders) {
			// Filter order items to only include those belonging to the current farmer
			List<OrderItems> farmerSpecificItems = order.getItems().stream()
					.filter(item -> item.getFarmer().getId().equals(farmerId)).collect(Collectors.toList());

			if (!farmerSpecificItems.isEmpty()) {
				CustomerOrderResponse response = mapToCustomerOrderResponse(order);
				// Override the items with only the farmer-specific items
				response.setItems(
						farmerSpecificItems.stream().map(this::mapToOrderItemResponse).collect(Collectors.toList()));

				// Calculate total quantity and price for farmer-specific items
				int farmerTotalQuantity = farmerSpecificItems.stream().mapToInt(OrderItems::getQuantity).sum();
				double farmerTotalPrice = farmerSpecificItems.stream().mapToDouble(OrderItems::getPrice).sum();
				response.setQuantity(farmerTotalQuantity);
				response.setPrice(farmerTotalPrice);

				farmerOrders.add(response);
			}
		}
		return farmerOrders;
	}

	/**
	 * Updates the delivery status of a specific order item. If all order items for
	 * a particular CustomerOrder have been confirmed by the farmer, the overall
	 * order status can also be updated (optional, depending on business logic).
	 *
	 * @param orderItemId The ID of the order item to update.
	 * @param newStatus   The new status (e.g., "Confirmed by Farmer").
	 * @return true if the update was successful, false otherwise.
	 */
	@Transactional
	public boolean confirmOrderItem(Long orderItemId) {
		Optional<OrderItems> optionalOrderItem = orderItemRepository.findById(orderItemId);
		if (optionalOrderItem.isEmpty()) {
			return false; // Order item not found
		}

		OrderItems orderItem = optionalOrderItem.get();
		orderItem.getOrder().setDeliveryStatus("Confirmed by Farmer"); // Update the status of the parent order
		customerOrderRepository.save(orderItem.getOrder()); // Save the updated order

		return true;
	}

	// Helper method to map CustomerOrder entity to CustomerOrderResponse DTO
	private CustomerOrderResponse mapToCustomerOrderResponse(CustomerOrder order) {
		CustomerOrderResponse response = new CustomerOrderResponse();
		response.setId(order.getId());
		response.setCustomerId(order.getCustomerId());
		response.setDeliveryAddress(order.getDeliveryAddress());
		response.setPaymentMethod(order.getPaymentMethod());
		response.setQuantity(order.getQuantity());
		response.setPrice(order.getPrice());
		response.setOrderDate(order.getOrderDate());
		response.setDeliveryStatus(order.getDeliveryStatus());

		if (order.getItems() != null) {
			List<OrderItemResponse> itemResponses = order.getItems().stream().map(this::mapToOrderItemResponse)
					.collect(Collectors.toList());
			response.setItems(itemResponses);
		}
		return response;
	}

	// Helper method to map OrderItems entity to OrderItemResponse DTO
	private OrderItemResponse mapToOrderItemResponse(OrderItems item) {
		OrderItemResponse response = new OrderItemResponse();
		response.setId(item.getId());
		response.setProductId(item.getProductId());
		response.setProductName(item.getProductName());
		response.setQuantity(item.getQuantity());
		response.setPrice(item.getPrice());
		if (item.getFarmer() != null) {
			response.setFarmerId(item.getFarmer().getId());
			response.setFarmerName(item.getFarmer().getName());
		}
		return response;
	}

	public List<CustomerOrder> getAllCustomerOrders() {
		return customerOrderRepository.findAll();
	}
	public List<ProfitSummaryResponse> getProfitSummary() {
	    List<OrderItems> allItems = orderItemRepository.findAll();

	    Map<Long, ProfitSummaryResponse> profitMap = new HashMap<>();

	    for (OrderItems item : allItems) {
	        double total = item.getPrice(); // Customer paid
	        double farmerAmount = total / 1.10; // Original amount
	        double adminCut = total - farmerAmount;

	        Long farmerId = item.getFarmer().getId();
	        String farmerName = item.getFarmer().getName();

	        profitMap.putIfAbsent(farmerId, new ProfitSummaryResponse(farmerName, farmerId, 0, 0, 0));

	        ProfitSummaryResponse summary = profitMap.get(farmerId);
	        summary.setTotalRevenue(summary.getTotalRevenue() + total);
	        summary.setFarmerEarnings(summary.getFarmerEarnings() + farmerAmount);
	        summary.setAdminProfit(summary.getAdminProfit() + adminCut);
	    }

	    return new ArrayList<>(profitMap.values());
	}

}