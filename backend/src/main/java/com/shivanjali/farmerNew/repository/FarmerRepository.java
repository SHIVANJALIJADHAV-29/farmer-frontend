package com.uday.farmerNew.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import com.uday.farmerNew.entity.Farmer;

public interface FarmerRepository extends JpaRepository<Farmer, Long> {

    Optional<Farmer> findByEmail(String email);

  	Optional<Farmer> findByFarmerPhone(String farmerPhone);

}
