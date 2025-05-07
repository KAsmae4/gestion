package com.kchaimae.repository;

import com.kchaimae.domain.TypeFormation;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data JPA repository for the TypeFormation entity.
 */
@SuppressWarnings("unused")
@Repository
public interface TypeFormationRepository extends JpaRepository<TypeFormation, Long> {}
