package com.kchaimae.repository;

import com.kchaimae.domain.Etudiant;
import java.util.List;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data JPA repository for the Etudiant entity.
 */
@SuppressWarnings("unused")
@Repository
public interface EtudiantRepository extends JpaRepository<Etudiant, Long> {
    @Query(
        "select et from Etudiant et where lower(et.nom) like lower(concat('%', ?1,'%')) OR lower(et.cin) like lower(concat('%', ?1,'%'))"
    )
    List<Etudiant> findAllBySearchValue(String query, Pageable pageable);
}
