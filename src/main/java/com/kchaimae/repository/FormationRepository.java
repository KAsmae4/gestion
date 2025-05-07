package com.kchaimae.repository;

import com.kchaimae.domain.Formation;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data JPA repository for the Formation entity.
 */
@SuppressWarnings("unused")
@Repository
public interface FormationRepository extends JpaRepository<Formation, Long> {}
