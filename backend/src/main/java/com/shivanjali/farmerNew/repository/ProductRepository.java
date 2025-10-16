package com.uday.farmerNew.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.uday.farmerNew.entity.Product;
import com.uday.farmerNew.entity.Farmer;

public interface ProductRepository extends JpaRepository<Product, Long> {
    List<Product> findByFarmer(Farmer farmer);  
}
