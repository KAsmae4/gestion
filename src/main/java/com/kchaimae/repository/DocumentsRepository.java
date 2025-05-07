package com.kchaimae.repository;

import com.kchaimae.domain.Documents;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * Spring Data JPA repository for the Documents entity.
 */
@SuppressWarnings("unused")
@Repository
public interface DocumentsRepository extends JpaRepository<Documents, Long> {
    Optional<Documents> findByDemandeId(Long id);
}
