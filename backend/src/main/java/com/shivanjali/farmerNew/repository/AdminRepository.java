package com.uday.farmerNew.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.uday.farmerNew.entity.Admin;

public interface AdminRepository extends JpaRepository<Admin, Integer> {
	Optional<Admin> findByEmail(String email);
}
