package com.kchaimae.web.rest;

import com.kchaimae.domain.TypeFormation;
import com.kchaimae.repository.TypeFormationRepository;
import com.kchaimae.web.rest.errors.BadRequestAlertException;
import com.kchaimae.web.rest.vm.GroupedTypeFormation;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.*;
import javax.validation.Valid;
import javax.validation.constraints.NotNull;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import tech.jhipster.web.util.HeaderUtil;
import tech.jhipster.web.util.PaginationUtil;
import tech.jhipster.web.util.ResponseUtil;

/**
 * REST controller for managing {@link com.kchaimae.domain.TypeFormation}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class TypeFormationResource {

    private final Logger log = LoggerFactory.getLogger(TypeFormationResource.class);

    private static final String ENTITY_NAME = "typeFormation";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final TypeFormationRepository typeFormationRepository;

    public TypeFormationResource(TypeFormationRepository typeFormationRepository) {
        this.typeFormationRepository = typeFormationRepository;
    }

    /**
     * {@code POST  /type-formations} : Create a new typeFormation.
     *
     * @param typeFormation the typeFormation to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new typeFormation, or with status {@code 400 (Bad Request)} if the typeFormation has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/type-formations")
    public ResponseEntity<TypeFormation> createTypeFormation(@Valid @RequestBody TypeFormation typeFormation) throws URISyntaxException {
        log.debug("REST request to save TypeFormation : {}", typeFormation);
        if (typeFormation.getId() != null) {
            throw new BadRequestAlertException("A new typeFormation cannot already have an ID", ENTITY_NAME, "idexists");
        }
        TypeFormation result = typeFormationRepository.save(typeFormation);
        return ResponseEntity
            .created(new URI("/api/type-formations/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /type-formations/:id} : Updates an existing typeFormation.
     *
     * @param id the id of the typeFormation to save.
     * @param typeFormation the typeFormation to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated typeFormation,
     * or with status {@code 400 (Bad Request)} if the typeFormation is not valid,
     * or with status {@code 500 (Internal Server Error)} if the typeFormation couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/type-formations/{id}")
    public ResponseEntity<TypeFormation> updateTypeFormation(
        @PathVariable(value = "id", required = false) final Long id,
        @Valid @RequestBody TypeFormation typeFormation
    ) throws URISyntaxException {
        log.debug("REST request to update TypeFormation : {}, {}", id, typeFormation);
        if (typeFormation.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, typeFormation.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!typeFormationRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        TypeFormation result = typeFormationRepository.save(typeFormation);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, typeFormation.getId().toString()))
            .body(result);
    }

    /**
     * {@code PATCH  /type-formations/:id} : Partial updates given fields of an existing typeFormation, field will ignore if it is null
     *
     * @param id the id of the typeFormation to save.
     * @param typeFormation the typeFormation to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated typeFormation,
     * or with status {@code 400 (Bad Request)} if the typeFormation is not valid,
     * or with status {@code 404 (Not Found)} if the typeFormation is not found,
     * or with status {@code 500 (Internal Server Error)} if the typeFormation couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/type-formations/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<TypeFormation> partialUpdateTypeFormation(
        @PathVariable(value = "id", required = false) final Long id,
        @NotNull @RequestBody TypeFormation typeFormation
    ) throws URISyntaxException {
        log.debug("REST request to partial update TypeFormation partially : {}, {}", id, typeFormation);
        if (typeFormation.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, typeFormation.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!typeFormationRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<TypeFormation> result = typeFormationRepository
            .findById(typeFormation.getId())
            .map(existingTypeFormation -> {
                if (typeFormation.getNom() != null) {
                    existingTypeFormation.setNom(typeFormation.getNom());
                }
                if (typeFormation.getType() != null) {
                    existingTypeFormation.setType(typeFormation.getType());
                }

                return existingTypeFormation;
            })
            .map(typeFormationRepository::save);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, typeFormation.getId().toString())
        );
    }

    /**
     * {@code GET  /type-formations} : get all the typeFormations.
     *
     * @param pageable the pagination information.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of typeFormations in body.
     */
    @GetMapping("/type-formations")
    public ResponseEntity<List<TypeFormation>> getAllTypeFormations(@org.springdoc.api.annotations.ParameterObject Pageable pageable) {
        log.debug("REST request to get a page of TypeFormations");
        Page<TypeFormation> page = typeFormationRepository.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * {@code GET  /type-formations} : get all the typeFormations.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of typeFormations in body.
     */
    @GetMapping("/type-formations/all")
    public ResponseEntity<List<GroupedTypeFormation>> getAllTypeFormations() {
        log.debug("REST request to get a page of TypeFormations");
        List<GroupedTypeFormation> result = new ArrayList<>();
        List<TypeFormation> all = typeFormationRepository.findAll();

        Map<String, List<TypeFormation>> resultMap = new HashMap<>();
        for (TypeFormation data : all) {
            if (!resultMap.containsKey(data.getType())) {
                resultMap.put(data.getType(), new ArrayList<>());
            }
            resultMap.get(data.getType()).add(data);
        }

        resultMap.forEach((typeName, typeFormations) -> {
            GroupedTypeFormation typeFormation = new GroupedTypeFormation();
            typeFormation.setTypes(typeFormations);
            typeFormation.setType(typeName);
            result.add(typeFormation);
        });

        return ResponseEntity.ok().body(result);
    }

    /**
     * {@code GET  /type-formations/:id} : get the "id" typeFormation.
     *
     * @param id the id of the typeFormation to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the typeFormation, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/type-formations/{id}")
    public ResponseEntity<TypeFormation> getTypeFormation(@PathVariable Long id) {
        log.debug("REST request to get TypeFormation : {}", id);
        Optional<TypeFormation> typeFormation = typeFormationRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(typeFormation);
    }

    /**
     * {@code DELETE  /type-formations/:id} : delete the "id" typeFormation.
     *
     * @param id the id of the typeFormation to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/type-formations/{id}")
    public ResponseEntity<Void> deleteTypeFormation(@PathVariable Long id) {
        log.debug("REST request to delete TypeFormation : {}", id);
        typeFormationRepository.deleteById(id);
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString()))
            .build();
    }
}
