package com.kchaimae.web.rest;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.kchaimae.IntegrationTest;
import com.kchaimae.domain.TypeFormation;
import com.kchaimae.repository.TypeFormationRepository;
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
 * Integration tests for the {@link TypeFormationResource} REST controller.
 */
@IntegrationTest
@AutoConfigureMockMvc
@WithMockUser
class TypeFormationResourceIT {

    private static final String DEFAULT_NOM = "AAAAAAAAAA";
    private static final String UPDATED_NOM = "BBBBBBBBBB";

    private static final String DEFAULT_TYPE = "AAAAAAAAAA";
    private static final String UPDATED_TYPE = "BBBBBBBBBB";

    private static final String ENTITY_API_URL = "/api/type-formations";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    private static Random random = new Random();
    private static AtomicLong count = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    @Autowired
    private TypeFormationRepository typeFormationRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restTypeFormationMockMvc;

    private TypeFormation typeFormation;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static TypeFormation createEntity(EntityManager em) {
        TypeFormation typeFormation = new TypeFormation().nom(DEFAULT_NOM).type(DEFAULT_TYPE);
        return typeFormation;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static TypeFormation createUpdatedEntity(EntityManager em) {
        TypeFormation typeFormation = new TypeFormation().nom(UPDATED_NOM).type(UPDATED_TYPE);
        return typeFormation;
    }

    @BeforeEach
    public void initTest() {
        typeFormation = createEntity(em);
    }

    @Test
    @Transactional
    void createTypeFormation() throws Exception {
        int databaseSizeBeforeCreate = typeFormationRepository.findAll().size();
        // Create the TypeFormation
        restTypeFormationMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(typeFormation)))
            .andExpect(status().isCreated());

        // Validate the TypeFormation in the database
        List<TypeFormation> typeFormationList = typeFormationRepository.findAll();
        assertThat(typeFormationList).hasSize(databaseSizeBeforeCreate + 1);
        TypeFormation testTypeFormation = typeFormationList.get(typeFormationList.size() - 1);
        assertThat(testTypeFormation.getNom()).isEqualTo(DEFAULT_NOM);
        assertThat(testTypeFormation.getType()).isEqualTo(DEFAULT_TYPE);
    }

    @Test
    @Transactional
    void createTypeFormationWithExistingId() throws Exception {
        // Create the TypeFormation with an existing ID
        typeFormation.setId(1L);

        int databaseSizeBeforeCreate = typeFormationRepository.findAll().size();

        // An entity with an existing ID cannot be created, so this API call must fail
        restTypeFormationMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(typeFormation)))
            .andExpect(status().isBadRequest());

        // Validate the TypeFormation in the database
        List<TypeFormation> typeFormationList = typeFormationRepository.findAll();
        assertThat(typeFormationList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    void checkNomIsRequired() throws Exception {
        int databaseSizeBeforeTest = typeFormationRepository.findAll().size();
        // set the field null
        typeFormation.setNom(null);

        // Create the TypeFormation, which fails.

        restTypeFormationMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(typeFormation)))
            .andExpect(status().isBadRequest());

        List<TypeFormation> typeFormationList = typeFormationRepository.findAll();
        assertThat(typeFormationList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    void checkTypeIsRequired() throws Exception {
        int databaseSizeBeforeTest = typeFormationRepository.findAll().size();
        // set the field null
        typeFormation.setType(null);

        // Create the TypeFormation, which fails.

        restTypeFormationMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(typeFormation)))
            .andExpect(status().isBadRequest());

        List<TypeFormation> typeFormationList = typeFormationRepository.findAll();
        assertThat(typeFormationList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    void getAllTypeFormations() throws Exception {
        // Initialize the database
        typeFormationRepository.saveAndFlush(typeFormation);

        // Get all the typeFormationList
        restTypeFormationMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(typeFormation.getId().intValue())))
            .andExpect(jsonPath("$.[*].nom").value(hasItem(DEFAULT_NOM)))
            .andExpect(jsonPath("$.[*].type").value(hasItem(DEFAULT_TYPE)));
    }

    @Test
    @Transactional
    void getTypeFormation() throws Exception {
        // Initialize the database
        typeFormationRepository.saveAndFlush(typeFormation);

        // Get the typeFormation
        restTypeFormationMockMvc
            .perform(get(ENTITY_API_URL_ID, typeFormation.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(typeFormation.getId().intValue()))
            .andExpect(jsonPath("$.nom").value(DEFAULT_NOM))
            .andExpect(jsonPath("$.type").value(DEFAULT_TYPE));
    }

    @Test
    @Transactional
    void getNonExistingTypeFormation() throws Exception {
        // Get the typeFormation
        restTypeFormationMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    void putExistingTypeFormation() throws Exception {
        // Initialize the database
        typeFormationRepository.saveAndFlush(typeFormation);

        int databaseSizeBeforeUpdate = typeFormationRepository.findAll().size();

        // Update the typeFormation
        TypeFormation updatedTypeFormation = typeFormationRepository.findById(typeFormation.getId()).get();
        // Disconnect from session so that the updates on updatedTypeFormation are not directly saved in db
        em.detach(updatedTypeFormation);
        updatedTypeFormation.nom(UPDATED_NOM).type(UPDATED_TYPE);

        restTypeFormationMockMvc
            .perform(
                put(ENTITY_API_URL_ID, updatedTypeFormation.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(updatedTypeFormation))
            )
            .andExpect(status().isOk());

        // Validate the TypeFormation in the database
        List<TypeFormation> typeFormationList = typeFormationRepository.findAll();
        assertThat(typeFormationList).hasSize(databaseSizeBeforeUpdate);
        TypeFormation testTypeFormation = typeFormationList.get(typeFormationList.size() - 1);
        assertThat(testTypeFormation.getNom()).isEqualTo(UPDATED_NOM);
        assertThat(testTypeFormation.getType()).isEqualTo(UPDATED_TYPE);
    }

    @Test
    @Transactional
    void putNonExistingTypeFormation() throws Exception {
        int databaseSizeBeforeUpdate = typeFormationRepository.findAll().size();
        typeFormation.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restTypeFormationMockMvc
            .perform(
                put(ENTITY_API_URL_ID, typeFormation.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(typeFormation))
            )
            .andExpect(status().isBadRequest());

        // Validate the TypeFormation in the database
        List<TypeFormation> typeFormationList = typeFormationRepository.findAll();
        assertThat(typeFormationList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithIdMismatchTypeFormation() throws Exception {
        int databaseSizeBeforeUpdate = typeFormationRepository.findAll().size();
        typeFormation.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restTypeFormationMockMvc
            .perform(
                put(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(typeFormation))
            )
            .andExpect(status().isBadRequest());

        // Validate the TypeFormation in the database
        List<TypeFormation> typeFormationList = typeFormationRepository.findAll();
        assertThat(typeFormationList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithMissingIdPathParamTypeFormation() throws Exception {
        int databaseSizeBeforeUpdate = typeFormationRepository.findAll().size();
        typeFormation.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restTypeFormationMockMvc
            .perform(put(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(typeFormation)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the TypeFormation in the database
        List<TypeFormation> typeFormationList = typeFormationRepository.findAll();
        assertThat(typeFormationList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void partialUpdateTypeFormationWithPatch() throws Exception {
        // Initialize the database
        typeFormationRepository.saveAndFlush(typeFormation);

        int databaseSizeBeforeUpdate = typeFormationRepository.findAll().size();

        // Update the typeFormation using partial update
        TypeFormation partialUpdatedTypeFormation = new TypeFormation();
        partialUpdatedTypeFormation.setId(typeFormation.getId());

        restTypeFormationMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedTypeFormation.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedTypeFormation))
            )
            .andExpect(status().isOk());

        // Validate the TypeFormation in the database
        List<TypeFormation> typeFormationList = typeFormationRepository.findAll();
        assertThat(typeFormationList).hasSize(databaseSizeBeforeUpdate);
        TypeFormation testTypeFormation = typeFormationList.get(typeFormationList.size() - 1);
        assertThat(testTypeFormation.getNom()).isEqualTo(DEFAULT_NOM);
        assertThat(testTypeFormation.getType()).isEqualTo(DEFAULT_TYPE);
    }

    @Test
    @Transactional
    void fullUpdateTypeFormationWithPatch() throws Exception {
        // Initialize the database
        typeFormationRepository.saveAndFlush(typeFormation);

        int databaseSizeBeforeUpdate = typeFormationRepository.findAll().size();

        // Update the typeFormation using partial update
        TypeFormation partialUpdatedTypeFormation = new TypeFormation();
        partialUpdatedTypeFormation.setId(typeFormation.getId());

        partialUpdatedTypeFormation.nom(UPDATED_NOM).type(UPDATED_TYPE);

        restTypeFormationMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedTypeFormation.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedTypeFormation))
            )
            .andExpect(status().isOk());

        // Validate the TypeFormation in the database
        List<TypeFormation> typeFormationList = typeFormationRepository.findAll();
        assertThat(typeFormationList).hasSize(databaseSizeBeforeUpdate);
        TypeFormation testTypeFormation = typeFormationList.get(typeFormationList.size() - 1);
        assertThat(testTypeFormation.getNom()).isEqualTo(UPDATED_NOM);
        assertThat(testTypeFormation.getType()).isEqualTo(UPDATED_TYPE);
    }

    @Test
    @Transactional
    void patchNonExistingTypeFormation() throws Exception {
        int databaseSizeBeforeUpdate = typeFormationRepository.findAll().size();
        typeFormation.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restTypeFormationMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, typeFormation.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(typeFormation))
            )
            .andExpect(status().isBadRequest());

        // Validate the TypeFormation in the database
        List<TypeFormation> typeFormationList = typeFormationRepository.findAll();
        assertThat(typeFormationList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithIdMismatchTypeFormation() throws Exception {
        int databaseSizeBeforeUpdate = typeFormationRepository.findAll().size();
        typeFormation.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restTypeFormationMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(typeFormation))
            )
            .andExpect(status().isBadRequest());

        // Validate the TypeFormation in the database
        List<TypeFormation> typeFormationList = typeFormationRepository.findAll();
        assertThat(typeFormationList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithMissingIdPathParamTypeFormation() throws Exception {
        int databaseSizeBeforeUpdate = typeFormationRepository.findAll().size();
        typeFormation.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restTypeFormationMockMvc
            .perform(
                patch(ENTITY_API_URL).contentType("application/merge-patch+json").content(TestUtil.convertObjectToJsonBytes(typeFormation))
            )
            .andExpect(status().isMethodNotAllowed());

        // Validate the TypeFormation in the database
        List<TypeFormation> typeFormationList = typeFormationRepository.findAll();
        assertThat(typeFormationList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void deleteTypeFormation() throws Exception {
        // Initialize the database
        typeFormationRepository.saveAndFlush(typeFormation);

        int databaseSizeBeforeDelete = typeFormationRepository.findAll().size();

        // Delete the typeFormation
        restTypeFormationMockMvc
            .perform(delete(ENTITY_API_URL_ID, typeFormation.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<TypeFormation> typeFormationList = typeFormationRepository.findAll();
        assertThat(typeFormationList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
