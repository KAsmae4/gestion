package com.kchaimae.web.rest;

import com.kchaimae.domain.TypeService;
import com.kchaimae.repository.TypeServiceRepository;
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
 * REST controller for managing {@link com.kchaimae.domain.TypeService}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class TypeServiceResource {

    private final Logger log = LoggerFactory.getLogger(TypeServiceResource.class);

    private static final String ENTITY_NAME = "typeService";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final TypeServiceRepository typeServiceRepository;

    public TypeServiceResource(TypeServiceRepository typeServiceRepository) {
        this.typeServiceRepository = typeServiceRepository;
    }

    /**
     * {@code POST  /type-services} : Create a new typeService.
     *
     * @param typeService the typeService to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new typeService, or with status {@code 400 (Bad Request)} if the typeService has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/type-services")
    public ResponseEntity<TypeService> createTypeService(@Valid @RequestBody TypeService typeService) throws URISyntaxException {
        log.debug("REST request to save TypeService : {}", typeService);
        if (typeService.getId() != null) {
            throw new BadRequestAlertException("A new typeService cannot already have an ID", ENTITY_NAME, "idexists");
        }
        TypeService result = typeServiceRepository.save(typeService);
        return ResponseEntity
            .created(new URI("/api/type-services/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /type-services/:id} : Updates an existing typeService.
     *
     * @param id the id of the typeService to save.
     * @param typeService the typeService to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated typeService,
     * or with status {@code 400 (Bad Request)} if the typeService is not valid,
     * or with status {@code 500 (Internal Server Error)} if the typeService couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/type-services/{id}")
    public ResponseEntity<TypeService> updateTypeService(
        @PathVariable(value = "id", required = false) final Long id,
        @Valid @RequestBody TypeService typeService
    ) throws URISyntaxException {
        log.debug("REST request to update TypeService : {}, {}", id, typeService);
        if (typeService.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, typeService.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!typeServiceRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        TypeService result = typeServiceRepository.save(typeService);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, typeService.getId().toString()))
            .body(result);
    }

    /**
     * {@code PATCH  /type-services/:id} : Partial updates given fields of an existing typeService, field will ignore if it is null
     *
     * @param id the id of the typeService to save.
     * @param typeService the typeService to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated typeService,
     * or with status {@code 400 (Bad Request)} if the typeService is not valid,
     * or with status {@code 404 (Not Found)} if the typeService is not found,
     * or with status {@code 500 (Internal Server Error)} if the typeService couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/type-services/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<TypeService> partialUpdateTypeService(
        @PathVariable(value = "id", required = false) final Long id,
        @NotNull @RequestBody TypeService typeService
    ) throws URISyntaxException {
        log.debug("REST request to partial update TypeService partially : {}, {}", id, typeService);
        if (typeService.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, typeService.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!typeServiceRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<TypeService> result = typeServiceRepository
            .findById(typeService.getId())
            .map(existingTypeService -> {
                if (typeService.getNom() != null) {
                    existingTypeService.setNom(typeService.getNom());
                }

                return existingTypeService;
            })
            .map(typeServiceRepository::save);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, typeService.getId().toString())
        );
    }

    /**
     * {@code GET  /type-services} : get all the typeServices.
     *
     * @param pageable the pagination information.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of typeServices in body.
     */
    @GetMapping("/type-services")
    public ResponseEntity<List<TypeService>> getAllTypeServices(@org.springdoc.api.annotations.ParameterObject Pageable pageable) {
        log.debug("REST request to get a page of TypeServices");
        Page<TypeService> page = typeServiceRepository.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * {@code GET  /type-services/:id} : get the "id" typeService.
     *
     * @param id the id of the typeService to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the typeService, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/type-services/{id}")
    public ResponseEntity<TypeService> getTypeService(@PathVariable Long id) {
        log.debug("REST request to get TypeService : {}", id);
        Optional<TypeService> typeService = typeServiceRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(typeService);
    }

    /**
     * {@code DELETE  /type-services/:id} : delete the "id" typeService.
     *
     * @param id the id of the typeService to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/type-services/{id}")
    public ResponseEntity<Void> deleteTypeService(@PathVariable Long id) {
        log.debug("REST request to delete TypeService : {}", id);
        typeServiceRepository.deleteById(id);
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString()))
            .build();
    }
}
