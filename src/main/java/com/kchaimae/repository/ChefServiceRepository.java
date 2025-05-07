package com.kchaimae.repository;

import com.kchaimae.domain.ChefService;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data JPA repository for the ChefService entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ChefServiceRepository extends JpaRepository<ChefService, Long> {}
