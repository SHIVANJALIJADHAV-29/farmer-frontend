package com.uday.farmerNew.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.uday.farmerNew.entity.OrderItems;

public interface OrderItemRepository extends JpaRepository<OrderItems, Long> {
}
