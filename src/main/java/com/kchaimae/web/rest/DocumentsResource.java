package com.kchaimae.web.rest;

import com.kchaimae.domain.Documents;
import com.kchaimae.repository.DocumentsRepository;
import com.kchaimae.web.rest.errors.BadRequestAlertException;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import tech.jhipster.web.util.HeaderUtil;
import tech.jhipster.web.util.PaginationUtil;
import tech.jhipster.web.util.ResponseUtil;

/**
 * REST controller for managing {@link Documents}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class DocumentsResource {

    private final Logger log = LoggerFactory.getLogger(DocumentsResource.class);

    private static final String ENTITY_NAME = "documents";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final DocumentsRepository documentsRepository;

    public DocumentsResource(DocumentsRepository documentsRepository) {
        this.documentsRepository = documentsRepository;
    }

    /**
     * {@code POST  /documents} : Create a new documents.
     *
     * @param documents the documents to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new documents, or with status {@code 400 (Bad Request)} if the documents has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/documents")
    public ResponseEntity<Documents> createDocuments(@RequestBody Documents documents) throws URISyntaxException {
        log.debug("REST request to save Documents : {}", documents);
        if (documents.getId() != null) {
            throw new BadRequestAlertException("A new documents cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Documents result = documentsRepository.save(documents);
        return ResponseEntity
            .created(new URI("/api/documents/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /documents/:id} : Updates an existing documents.
     *
     * @param id the id of the documents to save.
     * @param documents the documents to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated documents,
     * or with status {@code 400 (Bad Request)} if the documents is not valid,
     * or with status {@code 500 (Internal Server Error)} if the documents couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/documents/{id}")
    public ResponseEntity<Documents> updateDocuments(
        @PathVariable(value = "id", required = false) final Long id,
        @RequestBody Documents documents
    ) throws URISyntaxException {
        log.debug("REST request to update Documents : {}, {}", id, documents);
        if (documents.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, documents.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!documentsRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Documents result = documentsRepository.save(documents);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, documents.getId().toString()))
            .body(result);
    }

    /**
     * {@code PATCH  /documents/:id} : Partial updates given fields of an existing documents, field will ignore if it is null
     *
     * @param id the id of the documents to save.
     * @param documents the documents to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated documents,
     * or with status {@code 400 (Bad Request)} if the documents is not valid,
     * or with status {@code 404 (Not Found)} if the documents is not found,
     * or with status {@code 500 (Internal Server Error)} if the documents couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/documents/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<Documents> partialUpdateDocuments(
        @PathVariable(value = "id", required = false) final Long id,
        @RequestBody Documents documents
    ) throws URISyntaxException {
        log.debug("REST request to partial update Documents partially : {}, {}", id, documents);
        if (documents.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, documents.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!documentsRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<Documents> result = documentsRepository
            .findById(documents.getId())
            .map(existingDocuments -> {
                if (documents.getCv() != null) {
                    existingDocuments.setCv(documents.getCv());
                }
                if (documents.getCvContentType() != null) {
                    existingDocuments.setCvContentType(documents.getCvContentType());
                }
                if (documents.getAttestationAssurance() != null) {
                    existingDocuments.setAttestationAssurance(documents.getAttestationAssurance());
                }
                if (documents.getAttestationAssuranceContentType() != null) {
                    existingDocuments.setAttestationAssuranceContentType(documents.getAttestationAssuranceContentType());
                }

                return existingDocuments;
            })
            .map(documentsRepository::save);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, documents.getId().toString())
        );
    }

    /**
     * {@code GET  /documents} : get all the documents.
     *
     * @param pageable the pagination information.
     * @param filter the filter of the request.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of documents in body.
     */
    @GetMapping("/documents")
    public ResponseEntity<List<Documents>> getAllDocuments(
        @org.springdoc.api.annotations.ParameterObject Pageable pageable,
        @RequestParam(required = false) String filter
    ) {
        if ("demande-is-null".equals(filter)) {
            log.debug("REST request to get all Documentss where demande is null");
            return new ResponseEntity<>(
                StreamSupport
                    .stream(documentsRepository.findAll().spliterator(), false)
                    .filter(documents -> documents.getDemande() == null)
                    .collect(Collectors.toList()),
                HttpStatus.OK
            );
        }
        log.debug("REST request to get a page of Documents");
        Page<Documents> page = documentsRepository.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * {@code GET  /documents/:id} : get the "id" documents.
     *
     * @param id the id of the documents to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the documents, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/documents/{id}")
    public ResponseEntity<Documents> getDocuments(@PathVariable Long id) {
        log.debug("REST request to get Documents : {}", id);
        Optional<Documents> documents = documentsRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(documents);
    }

    /**
     * {@code GET  /documents/:id} : get the demande "id" documents.
     *
     * @param id the id of the demande to retrieve its documents.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the documents, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/documents/demande/{id}")
    public Documents getDocumentsByDemande(@PathVariable Long id) {
        log.debug("REST request to get Documents for Demande : {}", id);
        Optional<Documents> documents = documentsRepository.findByDemandeId(id);
        return documents.orElse(new Documents());
    }

    /**
     * {@code DELETE  /documents/:id} : delete the "id" documents.
     *
     * @param id the id of the documents to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/documents/{id}")
    public ResponseEntity<Void> deleteDocuments(@PathVariable Long id) {
        log.debug("REST request to delete Documents : {}", id);
        documentsRepository.deleteById(id);
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString()))
            .build();
    }
}
