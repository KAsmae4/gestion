package com.kchaimae.web.rest;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.kchaimae.IntegrationTest;
import com.kchaimae.domain.Encadrant;
import com.kchaimae.repository.EncadrantRepository;
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
 * Integration tests for the {@link EncadrantResource} REST controller.
 */
@IntegrationTest
@AutoConfigureMockMvc
@WithMockUser
class EncadrantResourceIT {

    private static final String DEFAULT_NOM = "AAAAAAAAAA";
    private static final String UPDATED_NOM = "BBBBBBBBBB";

    private static final String DEFAULT_PRENOM = "AAAAAAAAAA";
    private static final String UPDATED_PRENOM = "BBBBBBBBBB";

    private static final String DEFAULT_TELEPHONE = "AAAAAAAAAA";
    private static final String UPDATED_TELEPHONE = "BBBBBBBBBB";

    private static final String DEFAULT_EMAIL = "AAAAAAAAAA";
    private static final String UPDATED_EMAIL = "BBBBBBBBBB";

    private static final String ENTITY_API_URL = "/api/encadrants";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    private static Random random = new Random();
    private static AtomicLong count = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    @Autowired
    private EncadrantRepository encadrantRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restEncadrantMockMvc;

    private Encadrant encadrant;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Encadrant createEntity(EntityManager em) {
        Encadrant encadrant = new Encadrant().nom(DEFAULT_NOM).prenom(DEFAULT_PRENOM).telephone(DEFAULT_TELEPHONE).email(DEFAULT_EMAIL);
        return encadrant;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Encadrant createUpdatedEntity(EntityManager em) {
        Encadrant encadrant = new Encadrant().nom(UPDATED_NOM).prenom(UPDATED_PRENOM).telephone(UPDATED_TELEPHONE).email(UPDATED_EMAIL);
        return encadrant;
    }

    @BeforeEach
    public void initTest() {
        encadrant = createEntity(em);
    }

    @Test
    @Transactional
    void createEncadrant() throws Exception {
        int databaseSizeBeforeCreate = encadrantRepository.findAll().size();
        // Create the Encadrant
        restEncadrantMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(encadrant)))
            .andExpect(status().isCreated());

        // Validate the Encadrant in the database
        List<Encadrant> encadrantList = encadrantRepository.findAll();
        assertThat(encadrantList).hasSize(databaseSizeBeforeCreate + 1);
        Encadrant testEncadrant = encadrantList.get(encadrantList.size() - 1);
        assertThat(testEncadrant.getNom()).isEqualTo(DEFAULT_NOM);
        assertThat(testEncadrant.getPrenom()).isEqualTo(DEFAULT_PRENOM);
        assertThat(testEncadrant.getTelephone()).isEqualTo(DEFAULT_TELEPHONE);
        assertThat(testEncadrant.getEmail()).isEqualTo(DEFAULT_EMAIL);
    }

    @Test
    @Transactional
    void createEncadrantWithExistingId() throws Exception {
        // Create the Encadrant with an existing ID
        encadrant.setId(1L);

        int databaseSizeBeforeCreate = encadrantRepository.findAll().size();

        // An entity with an existing ID cannot be created, so this API call must fail
        restEncadrantMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(encadrant)))
            .andExpect(status().isBadRequest());

        // Validate the Encadrant in the database
        List<Encadrant> encadrantList = encadrantRepository.findAll();
        assertThat(encadrantList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    void checkNomIsRequired() throws Exception {
        int databaseSizeBeforeTest = encadrantRepository.findAll().size();
        // set the field null
        encadrant.setNom(null);

        // Create the Encadrant, which fails.

        restEncadrantMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(encadrant)))
            .andExpect(status().isBadRequest());

        List<Encadrant> encadrantList = encadrantRepository.findAll();
        assertThat(encadrantList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    void checkPrenomIsRequired() throws Exception {
        int databaseSizeBeforeTest = encadrantRepository.findAll().size();
        // set the field null
        encadrant.setPrenom(null);

        // Create the Encadrant, which fails.

        restEncadrantMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(encadrant)))
            .andExpect(status().isBadRequest());

        List<Encadrant> encadrantList = encadrantRepository.findAll();
        assertThat(encadrantList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    void checkTelephoneIsRequired() throws Exception {
        int databaseSizeBeforeTest = encadrantRepository.findAll().size();
        // set the field null
        encadrant.setTelephone(null);

        // Create the Encadrant, which fails.

        restEncadrantMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(encadrant)))
            .andExpect(status().isBadRequest());

        List<Encadrant> encadrantList = encadrantRepository.findAll();
        assertThat(encadrantList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    void checkEmailIsRequired() throws Exception {
        int databaseSizeBeforeTest = encadrantRepository.findAll().size();
        // set the field null
        encadrant.setEmail(null);

        // Create the Encadrant, which fails.

        restEncadrantMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(encadrant)))
            .andExpect(status().isBadRequest());

        List<Encadrant> encadrantList = encadrantRepository.findAll();
        assertThat(encadrantList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    void getAllEncadrants() throws Exception {
        // Initialize the database
        encadrantRepository.saveAndFlush(encadrant);

        // Get all the encadrantList
        restEncadrantMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(encadrant.getId().intValue())))
            .andExpect(jsonPath("$.[*].nom").value(hasItem(DEFAULT_NOM)))
            .andExpect(jsonPath("$.[*].prenom").value(hasItem(DEFAULT_PRENOM)))
            .andExpect(jsonPath("$.[*].telephone").value(hasItem(DEFAULT_TELEPHONE)))
            .andExpect(jsonPath("$.[*].email").value(hasItem(DEFAULT_EMAIL)));
    }

    @Test
    @Transactional
    void getEncadrant() throws Exception {
        // Initialize the database
        encadrantRepository.saveAndFlush(encadrant);

        // Get the encadrant
        restEncadrantMockMvc
            .perform(get(ENTITY_API_URL_ID, encadrant.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(encadrant.getId().intValue()))
            .andExpect(jsonPath("$.nom").value(DEFAULT_NOM))
            .andExpect(jsonPath("$.prenom").value(DEFAULT_PRENOM))
            .andExpect(jsonPath("$.telephone").value(DEFAULT_TELEPHONE))
            .andExpect(jsonPath("$.email").value(DEFAULT_EMAIL));
    }

    @Test
    @Transactional
    void getNonExistingEncadrant() throws Exception {
        // Get the encadrant
        restEncadrantMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    void putExistingEncadrant() throws Exception {
        // Initialize the database
        encadrantRepository.saveAndFlush(encadrant);

        int databaseSizeBeforeUpdate = encadrantRepository.findAll().size();

        // Update the encadrant
        Encadrant updatedEncadrant = encadrantRepository.findById(encadrant.getId()).get();
        // Disconnect from session so that the updates on updatedEncadrant are not directly saved in db
        em.detach(updatedEncadrant);
        updatedEncadrant.nom(UPDATED_NOM).prenom(UPDATED_PRENOM).telephone(UPDATED_TELEPHONE).email(UPDATED_EMAIL);

        restEncadrantMockMvc
            .perform(
                put(ENTITY_API_URL_ID, updatedEncadrant.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(updatedEncadrant))
            )
            .andExpect(status().isOk());

        // Validate the Encadrant in the database
        List<Encadrant> encadrantList = encadrantRepository.findAll();
        assertThat(encadrantList).hasSize(databaseSizeBeforeUpdate);
        Encadrant testEncadrant = encadrantList.get(encadrantList.size() - 1);
        assertThat(testEncadrant.getNom()).isEqualTo(UPDATED_NOM);
        assertThat(testEncadrant.getPrenom()).isEqualTo(UPDATED_PRENOM);
        assertThat(testEncadrant.getTelephone()).isEqualTo(UPDATED_TELEPHONE);
        assertThat(testEncadrant.getEmail()).isEqualTo(UPDATED_EMAIL);
    }

    @Test
    @Transactional
    void putNonExistingEncadrant() throws Exception {
        int databaseSizeBeforeUpdate = encadrantRepository.findAll().size();
        encadrant.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restEncadrantMockMvc
            .perform(
                put(ENTITY_API_URL_ID, encadrant.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(encadrant))
            )
            .andExpect(status().isBadRequest());

        // Validate the Encadrant in the database
        List<Encadrant> encadrantList = encadrantRepository.findAll();
        assertThat(encadrantList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithIdMismatchEncadrant() throws Exception {
        int databaseSizeBeforeUpdate = encadrantRepository.findAll().size();
        encadrant.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restEncadrantMockMvc
            .perform(
                put(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(encadrant))
            )
            .andExpect(status().isBadRequest());

        // Validate the Encadrant in the database
        List<Encadrant> encadrantList = encadrantRepository.findAll();
        assertThat(encadrantList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithMissingIdPathParamEncadrant() throws Exception {
        int databaseSizeBeforeUpdate = encadrantRepository.findAll().size();
        encadrant.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restEncadrantMockMvc
            .perform(put(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(encadrant)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the Encadrant in the database
        List<Encadrant> encadrantList = encadrantRepository.findAll();
        assertThat(encadrantList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void partialUpdateEncadrantWithPatch() throws Exception {
        // Initialize the database
        encadrantRepository.saveAndFlush(encadrant);

        int databaseSizeBeforeUpdate = encadrantRepository.findAll().size();

        // Update the encadrant using partial update
        Encadrant partialUpdatedEncadrant = new Encadrant();
        partialUpdatedEncadrant.setId(encadrant.getId());

        partialUpdatedEncadrant.nom(UPDATED_NOM).prenom(UPDATED_PRENOM).telephone(UPDATED_TELEPHONE);

        restEncadrantMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedEncadrant.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedEncadrant))
            )
            .andExpect(status().isOk());

        // Validate the Encadrant in the database
        List<Encadrant> encadrantList = encadrantRepository.findAll();
        assertThat(encadrantList).hasSize(databaseSizeBeforeUpdate);
        Encadrant testEncadrant = encadrantList.get(encadrantList.size() - 1);
        assertThat(testEncadrant.getNom()).isEqualTo(UPDATED_NOM);
        assertThat(testEncadrant.getPrenom()).isEqualTo(UPDATED_PRENOM);
        assertThat(testEncadrant.getTelephone()).isEqualTo(UPDATED_TELEPHONE);
        assertThat(testEncadrant.getEmail()).isEqualTo(DEFAULT_EMAIL);
    }

    @Test
    @Transactional
    void fullUpdateEncadrantWithPatch() throws Exception {
        // Initialize the database
        encadrantRepository.saveAndFlush(encadrant);

        int databaseSizeBeforeUpdate = encadrantRepository.findAll().size();

        // Update the encadrant using partial update
        Encadrant partialUpdatedEncadrant = new Encadrant();
        partialUpdatedEncadrant.setId(encadrant.getId());

        partialUpdatedEncadrant.nom(UPDATED_NOM).prenom(UPDATED_PRENOM).telephone(UPDATED_TELEPHONE).email(UPDATED_EMAIL);

        restEncadrantMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedEncadrant.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedEncadrant))
            )
            .andExpect(status().isOk());

        // Validate the Encadrant in the database
        List<Encadrant> encadrantList = encadrantRepository.findAll();
        assertThat(encadrantList).hasSize(databaseSizeBeforeUpdate);
        Encadrant testEncadrant = encadrantList.get(encadrantList.size() - 1);
        assertThat(testEncadrant.getNom()).isEqualTo(UPDATED_NOM);
        assertThat(testEncadrant.getPrenom()).isEqualTo(UPDATED_PRENOM);
        assertThat(testEncadrant.getTelephone()).isEqualTo(UPDATED_TELEPHONE);
        assertThat(testEncadrant.getEmail()).isEqualTo(UPDATED_EMAIL);
    }

    @Test
    @Transactional
    void patchNonExistingEncadrant() throws Exception {
        int databaseSizeBeforeUpdate = encadrantRepository.findAll().size();
        encadrant.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restEncadrantMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, encadrant.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(encadrant))
            )
            .andExpect(status().isBadRequest());

        // Validate the Encadrant in the database
        List<Encadrant> encadrantList = encadrantRepository.findAll();
        assertThat(encadrantList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithIdMismatchEncadrant() throws Exception {
        int databaseSizeBeforeUpdate = encadrantRepository.findAll().size();
        encadrant.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restEncadrantMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(encadrant))
            )
            .andExpect(status().isBadRequest());

        // Validate the Encadrant in the database
        List<Encadrant> encadrantList = encadrantRepository.findAll();
        assertThat(encadrantList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithMissingIdPathParamEncadrant() throws Exception {
        int databaseSizeBeforeUpdate = encadrantRepository.findAll().size();
        encadrant.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restEncadrantMockMvc
            .perform(
                patch(ENTITY_API_URL).contentType("application/merge-patch+json").content(TestUtil.convertObjectToJsonBytes(encadrant))
            )
            .andExpect(status().isMethodNotAllowed());

        // Validate the Encadrant in the database
        List<Encadrant> encadrantList = encadrantRepository.findAll();
        assertThat(encadrantList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void deleteEncadrant() throws Exception {
        // Initialize the database
        encadrantRepository.saveAndFlush(encadrant);

        int databaseSizeBeforeDelete = encadrantRepository.findAll().size();

        // Delete the encadrant
        restEncadrantMockMvc
            .perform(delete(ENTITY_API_URL_ID, encadrant.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Encadrant> encadrantList = encadrantRepository.findAll();
        assertThat(encadrantList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
