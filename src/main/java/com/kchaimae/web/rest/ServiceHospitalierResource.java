package com.kchaimae.web.rest;

import com.kchaimae.domain.ServiceHospitalier;
import com.kchaimae.repository.ServiceHospitalierRepository;
import com.kchaimae.web.rest.errors.BadRequestAlertException;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import javax.validation.Valid;
import javax.validation.constraints.NotNull;
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
 * REST controller for managing {@link com.kchaimae.domain.ServiceHospitalier}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class ServiceHospitalierResource {

    private final Logger log = LoggerFactory.getLogger(ServiceHospitalierResource.class);

    private static final String ENTITY_NAME = "serviceHospitalier";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final ServiceHospitalierRepository serviceHospitalierRepository;

    public ServiceHospitalierResource(ServiceHospitalierRepository serviceHospitalierRepository) {
        this.serviceHospitalierRepository = serviceHospitalierRepository;
    }

    /**
     * {@code POST  /service-hospitaliers} : Create a new serviceHospitalier.
     *
     * @param serviceHospitalier the serviceHospitalier to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new serviceHospitalier, or with status {@code 400 (Bad Request)} if the serviceHospitalier has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/service-hospitaliers")
    public ResponseEntity<ServiceHospitalier> createServiceHospitalier(@Valid @RequestBody ServiceHospitalier serviceHospitalier)
        throws URISyntaxException {
        log.debug("REST request to save ServiceHospitalier : {}", serviceHospitalier);
        if (serviceHospitalier.getId() != null) {
            throw new BadRequestAlertException("A new serviceHospitalier cannot already have an ID", ENTITY_NAME, "idexists");
        }
        ServiceHospitalier result = serviceHospitalierRepository.save(serviceHospitalier);
        return ResponseEntity
            .created(new URI("/api/service-hospitaliers/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /service-hospitaliers/:id} : Updates an existing serviceHospitalier.
     *
     * @param id the id of the serviceHospitalier to save.
     * @param serviceHospitalier the serviceHospitalier to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated serviceHospitalier,
     * or with status {@code 400 (Bad Request)} if the serviceHospitalier is not valid,
     * or with status {@code 500 (Internal Server Error)} if the serviceHospitalier couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/service-hospitaliers/{id}")
    public ResponseEntity<ServiceHospitalier> updateServiceHospitalier(
        @PathVariable(value = "id", required = false) final Long id,
        @Valid @RequestBody ServiceHospitalier serviceHospitalier
    ) throws URISyntaxException {
        log.debug("REST request to update ServiceHospitalier : {}, {}", id, serviceHospitalier);
        if (serviceHospitalier.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, serviceHospitalier.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!serviceHospitalierRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        ServiceHospitalier result = serviceHospitalierRepository.save(serviceHospitalier);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, serviceHospitalier.getId().toString()))
            .body(result);
    }

    /**
     * {@code PATCH  /service-hospitaliers/:id} : Partial updates given fields of an existing serviceHospitalier, field will ignore if it is null
     *
     * @param id the id of the serviceHospitalier to save.
     * @param serviceHospitalier the serviceHospitalier to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated serviceHospitalier,
     * or with status {@code 400 (Bad Request)} if the serviceHospitalier is not valid,
     * or with status {@code 404 (Not Found)} if the serviceHospitalier is not found,
     * or with status {@code 500 (Internal Server Error)} if the serviceHospitalier couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/service-hospitaliers/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<ServiceHospitalier> partialUpdateServiceHospitalier(
        @PathVariable(value = "id", required = false) final Long id,
        @NotNull @RequestBody ServiceHospitalier serviceHospitalier
    ) throws URISyntaxException {
        log.debug("REST request to partial update ServiceHospitalier partially : {}, {}", id, serviceHospitalier);
        if (serviceHospitalier.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, serviceHospitalier.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!serviceHospitalierRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<ServiceHospitalier> result = serviceHospitalierRepository
            .findById(serviceHospitalier.getId())
            .map(existingServiceHospitalier -> {
                if (serviceHospitalier.getNom() != null) {
                    existingServiceHospitalier.setNom(serviceHospitalier.getNom());
                }
                if (serviceHospitalier.getEmplacement() != null) {
                    existingServiceHospitalier.setEmplacement(serviceHospitalier.getEmplacement());
                }

                return existingServiceHospitalier;
            })
            .map(serviceHospitalierRepository::save);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, serviceHospitalier.getId().toString())
        );
    }

    /**
     * {@code GET  /service-hospitaliers} : get all the serviceHospitaliers.
     *
     * @param pageable the pagination information.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of serviceHospitaliers in body.
     */
    @GetMapping("/service-hospitaliers")
    public ResponseEntity<List<ServiceHospitalier>> getAllServiceHospitaliers(
        @org.springdoc.api.annotations.ParameterObject Pageable pageable
    ) {
        log.debug("REST request to get a page of ServiceHospitaliers");
        Page<ServiceHospitalier> page = serviceHospitalierRepository.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * {@code GET  /service-hospitaliers/:id} : get the "id" serviceHospitalier.
     *
     * @param id the id of the serviceHospitalier to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the serviceHospitalier, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/service-hospitaliers/{id}")
    public ResponseEntity<ServiceHospitalier> getServiceHospitalier(@PathVariable Long id) {
        log.debug("REST request to get ServiceHospitalier : {}", id);
        Optional<ServiceHospitalier> serviceHospitalier = serviceHospitalierRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(serviceHospitalier);
    }

    /**
     * {@code DELETE  /service-hospitaliers/:id} : delete the "id" serviceHospitalier.
     *
     * @param id the id of the serviceHospitalier to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/service-hospitaliers/{id}")
    public ResponseEntity<Void> deleteServiceHospitalier(@PathVariable Long id) {
        log.debug("REST request to delete ServiceHospitalier : {}", id);
        serviceHospitalierRepository.deleteById(id);
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString()))
            .build();
    }
}
