package com.kchaimae.web.rest;

import com.kchaimae.domain.Demande;
import com.kchaimae.domain.Etudiant;
import com.kchaimae.repository.DemandeRepository;
import com.kchaimae.repository.DocumentsRepository;
import com.kchaimae.repository.EtudiantRepository;
import com.kchaimae.repository.FormationRepository;
import com.kchaimae.web.rest.vm.FormulaireDemande;
import java.net.URI;
import java.net.URISyntaxException;
import javax.validation.Valid;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import tech.jhipster.web.util.HeaderUtil;

/**
 * REST controller for managing {@link FormulaireDemande}.
 */
@RestController
@RequestMapping("/api/formulaire-demande")
@Transactional
public class FormulaireDemandeResource {

    private final Logger log = LoggerFactory.getLogger(FormulaireDemandeResource.class);

    private static final String ENTITY_NAME = "FormulaireDemande";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final DemandeRepository demandeRepository;
    private final EtudiantRepository etudiantRepository;
    private final FormationRepository formationRepository;
    private final DocumentsRepository documentsRepository;

    public FormulaireDemandeResource(
        DemandeRepository demandeRepository,
        EtudiantRepository etudiantRepository,
        FormationRepository formationRepository,
        DocumentsRepository documentsRepository
    ) {
        this.demandeRepository = demandeRepository;
        this.etudiantRepository = etudiantRepository;
        this.formationRepository = formationRepository;
        this.documentsRepository = documentsRepository;
    }

    @PostMapping
    public ResponseEntity<Void> createDemande(@Valid @RequestBody FormulaireDemande formulaireDemande) throws URISyntaxException {
        log.debug("REST request to save FormulaireDemande : {}", formulaireDemande);

        final Etudiant etudiant = etudiantRepository.save(formulaireDemande.getEtudiant());
        formulaireDemande.getDemande().setEtudiant(etudiant);

        final Demande demande = demandeRepository.save(formulaireDemande.getDemande());

        formulaireDemande.getFormation().setDemande(demande);
        formationRepository.save(formulaireDemande.getFormation());

        formulaireDemande.getDocuments().setDemande(demande);
        documentsRepository.save(formulaireDemande.getDocuments());

        return ResponseEntity
            .created(new URI("/api/formulaire-demande/" + demande.getId()))
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, demande.getId().toString()))
            .build();
    }
}
