package com.kchaimae.repository;

import com.kchaimae.domain.TypeService;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data JPA repository for the TypeService entity.
 */
@SuppressWarnings("unused")
@Repository
public interface TypeServiceRepository extends JpaRepository<TypeService, Long> {}
