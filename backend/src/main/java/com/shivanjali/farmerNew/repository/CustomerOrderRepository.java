package com.uday.farmerNew.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.uday.farmerNew.entity.CustomerOrder;

public interface CustomerOrderRepository extends JpaRepository<CustomerOrder, Long> {
	List<CustomerOrder> findByCustomerId(Long customerId);
	
	// This is the new method you need to add for the farmer's orders
    // It queries CustomerOrder entities based on the 'farmerId' within their 'items' collection.
    List<CustomerOrder> findByItems_FarmerId(Long farmerId);
}

