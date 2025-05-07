package com.kchaimae.web.rest;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.kchaimae.IntegrationTest;
import com.kchaimae.domain.TypeService;
import com.kchaimae.repository.TypeServiceRepository;
import java.util.List;
import java.util.Random;
import java.util.concurrent.atomic.AtomicLong;
import javax.persistence.EntityManager;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;

/**
 * Integration tests for the {@link TypeServiceResource} REST controller.
 */
@IntegrationTest
@AutoConfigureMockMvc
@WithMockUser
class TypeServiceResourceIT {

    private static final String DEFAULT_NOM = "AAAAAAAAAA";
    private static final String UPDATED_NOM = "BBBBBBBBBB";

    private static final String ENTITY_API_URL = "/api/type-services";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    private static Random random = new Random();
    private static AtomicLong count = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    @Autowired
    private TypeServiceRepository typeServiceRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restTypeServiceMockMvc;

    private TypeService typeService;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static TypeService createEntity(EntityManager em) {
        TypeService typeService = new TypeService().nom(DEFAULT_NOM);
        return typeService;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static TypeService createUpdatedEntity(EntityManager em) {
        TypeService typeService = new TypeService().nom(UPDATED_NOM);
        return typeService;
    }

    @BeforeEach
    public void initTest() {
        typeService = createEntity(em);
    }

    @Test
    @Transactional
    void createTypeService() throws Exception {
        int databaseSizeBeforeCreate = typeServiceRepository.findAll().size();
        // Create the TypeService
        restTypeServiceMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(typeService)))
            .andExpect(status().isCreated());

        // Validate the TypeService in the database
        List<TypeService> typeServiceList = typeServiceRepository.findAll();
        assertThat(typeServiceList).hasSize(databaseSizeBeforeCreate + 1);
        TypeService testTypeService = typeServiceList.get(typeServiceList.size() - 1);
        assertThat(testTypeService.getNom()).isEqualTo(DEFAULT_NOM);
    }

    @Test
    @Transactional
    void createTypeServiceWithExistingId() throws Exception {
        // Create the TypeService with an existing ID
        typeService.setId(1L);

        int databaseSizeBeforeCreate = typeServiceRepository.findAll().size();

        // An entity with an existing ID cannot be created, so this API call must fail
        restTypeServiceMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(typeService)))
            .andExpect(status().isBadRequest());

        // Validate the TypeService in the database
        List<TypeService> typeServiceList = typeServiceRepository.findAll();
        assertThat(typeServiceList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    void checkNomIsRequired() throws Exception {
        int databaseSizeBeforeTest = typeServiceRepository.findAll().size();
        // set the field null
        typeService.setNom(null);

        // Create the TypeService, which fails.

        restTypeServiceMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(typeService)))
            .andExpect(status().isBadRequest());

        List<TypeService> typeServiceList = typeServiceRepository.findAll();
        assertThat(typeServiceList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    void getAllTypeServices() throws Exception {
        // Initialize the database
        typeServiceRepository.saveAndFlush(typeService);

        // Get all the typeServiceList
        restTypeServiceMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(typeService.getId().intValue())))
            .andExpect(jsonPath("$.[*].nom").value(hasItem(DEFAULT_NOM)));
    }

    @Test
    @Transactional
    void getTypeService() throws Exception {
        // Initialize the database
        typeServiceRepository.saveAndFlush(typeService);

        // Get the typeService
        restTypeServiceMockMvc
            .perform(get(ENTITY_API_URL_ID, typeService.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(typeService.getId().intValue()))
            .andExpect(jsonPath("$.nom").value(DEFAULT_NOM));
    }

    @Test
    @Transactional
    void getNonExistingTypeService() throws Exception {
        // Get the typeService
        restTypeServiceMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    void putExistingTypeService() throws Exception {
        // Initialize the database
        typeServiceRepository.saveAndFlush(typeService);

        int databaseSizeBeforeUpdate = typeServiceRepository.findAll().size();

        // Update the typeService
        TypeService updatedTypeService = typeServiceRepository.findById(typeService.getId()).get();
        // Disconnect from session so that the updates on updatedTypeService are not directly saved in db
        em.detach(updatedTypeService);
        updatedTypeService.nom(UPDATED_NOM);

        restTypeServiceMockMvc
            .perform(
                put(ENTITY_API_URL_ID, updatedTypeService.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(updatedTypeService))
            )
            .andExpect(status().isOk());

        // Validate the TypeService in the database
        List<TypeService> typeServiceList = typeServiceRepository.findAll();
        assertThat(typeServiceList).hasSize(databaseSizeBeforeUpdate);
        TypeService testTypeService = typeServiceList.get(typeServiceList.size() - 1);
        assertThat(testTypeService.getNom()).isEqualTo(UPDATED_NOM);
    }

    @Test
    @Transactional
    void putNonExistingTypeService() throws Exception {
        int databaseSizeBeforeUpdate = typeServiceRepository.findAll().size();
        typeService.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restTypeServiceMockMvc
            .perform(
                put(ENTITY_API_URL_ID, typeService.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(typeService))
            )
            .andExpect(status().isBadRequest());

        // Validate the TypeService in the database
        List<TypeService> typeServiceList = typeServiceRepository.findAll();
        assertThat(typeServiceList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithIdMismatchTypeService() throws Exception {
        int databaseSizeBeforeUpdate = typeServiceRepository.findAll().size();
        typeService.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restTypeServiceMockMvc
            .perform(
                put(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(typeService))
            )
            .andExpect(status().isBadRequest());

        // Validate the TypeService in the database
        List<TypeService> typeServiceList = typeServiceRepository.findAll();
        assertThat(typeServiceList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithMissingIdPathParamTypeService() throws Exception {
        int databaseSizeBeforeUpdate = typeServiceRepository.findAll().size();
        typeService.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restTypeServiceMockMvc
            .perform(put(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(typeService)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the TypeService in the database
        List<TypeService> typeServiceList = typeServiceRepository.findAll();
        assertThat(typeServiceList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void partialUpdateTypeServiceWithPatch() throws Exception {
        // Initialize the database
        typeServiceRepository.saveAndFlush(typeService);

        int databaseSizeBeforeUpdate = typeServiceRepository.findAll().size();

        // Update the typeService using partial update
        TypeService partialUpdatedTypeService = new TypeService();
        partialUpdatedTypeService.setId(typeService.getId());

        restTypeServiceMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedTypeService.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedTypeService))
            )
            .andExpect(status().isOk());

        // Validate the TypeService in the database
        List<TypeService> typeServiceList = typeServiceRepository.findAll();
        assertThat(typeServiceList).hasSize(databaseSizeBeforeUpdate);
        TypeService testTypeService = typeServiceList.get(typeServiceList.size() - 1);
        assertThat(testTypeService.getNom()).isEqualTo(DEFAULT_NOM);
    }

    @Test
    @Transactional
    void fullUpdateTypeServiceWithPatch() throws Exception {
        // Initialize the database
        typeServiceRepository.saveAndFlush(typeService);

        int databaseSizeBeforeUpdate = typeServiceRepository.findAll().size();

        // Update the typeService using partial update
        TypeService partialUpdatedTypeService = new TypeService();
        partialUpdatedTypeService.setId(typeService.getId());

        partialUpdatedTypeService.nom(UPDATED_NOM);

        restTypeServiceMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedTypeService.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedTypeService))
            )
            .andExpect(status().isOk());

        // Validate the TypeService in the database
        List<TypeService> typeServiceList = typeServiceRepository.findAll();
        assertThat(typeServiceList).hasSize(databaseSizeBeforeUpdate);
        TypeService testTypeService = typeServiceList.get(typeServiceList.size() - 1);
        assertThat(testTypeService.getNom()).isEqualTo(UPDATED_NOM);
    }

    @Test
    @Transactional
    void patchNonExistingTypeService() throws Exception {
        int databaseSizeBeforeUpdate = typeServiceRepository.findAll().size();
        typeService.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restTypeServiceMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, typeService.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(typeService))
            )
            .andExpect(status().isBadRequest());

        // Validate the TypeService in the database
        List<TypeService> typeServiceList = typeServiceRepository.findAll();
        assertThat(typeServiceList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithIdMismatchTypeService() throws Exception {
        int databaseSizeBeforeUpdate = typeServiceRepository.findAll().size();
        typeService.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restTypeServiceMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(typeService))
            )
            .andExpect(status().isBadRequest());

        // Validate the TypeService in the database
        List<TypeService> typeServiceList = typeServiceRepository.findAll();
        assertThat(typeServiceList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithMissingIdPathParamTypeService() throws Exception {
        int databaseSizeBeforeUpdate = typeServiceRepository.findAll().size();
        typeService.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restTypeServiceMockMvc
            .perform(
                patch(ENTITY_API_URL).contentType("application/merge-patch+json").content(TestUtil.convertObjectToJsonBytes(typeService))
            )
            .andExpect(status().isMethodNotAllowed());

        // Validate the TypeService in the database
        List<TypeService> typeServiceList = typeServiceRepository.findAll();
        assertThat(typeServiceList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void deleteTypeService() throws Exception {
        // Initialize the database
        typeServiceRepository.saveAndFlush(typeService);

        int databaseSizeBeforeDelete = typeServiceRepository.findAll().size();

        // Delete the typeService
        restTypeServiceMockMvc
            .perform(delete(ENTITY_API_URL_ID, typeService.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<TypeService> typeServiceList = typeServiceRepository.findAll();
        assertThat(typeServiceList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
