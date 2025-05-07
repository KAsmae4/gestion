package com.kchaimae.repository;

import com.kchaimae.domain.ServiceHospitalier;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data JPA repository for the ServiceHospitalier entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ServiceHospitalierRepository extends JpaRepository<ServiceHospitalier, Long> {}
