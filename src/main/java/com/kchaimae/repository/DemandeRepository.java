package com.kchaimae.repository;

import com.kchaimae.domain.Demande;
import com.kchaimae.domain.enumeration.StatutDemande;
import java.util.List;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data JPA repository for the Demande entity.
 */
@SuppressWarnings("unused")
@Repository
public interface DemandeRepository extends JpaRepository<Demande, Long> {
    List<Demande> findAllByEtudiantId(Long id);

    List<Demande> findAllByStatut(StatutDemande statut);
}
