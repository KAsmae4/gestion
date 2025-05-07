package com.kchaimae.repository;

import com.kchaimae.domain.Encadrant;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data JPA repository for the Encadrant entity.
 */
@SuppressWarnings("unused")
@Repository
public interface EncadrantRepository extends JpaRepository<Encadrant, Long> {}
