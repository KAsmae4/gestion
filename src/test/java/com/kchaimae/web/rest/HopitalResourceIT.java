package com.kchaimae.web.rest;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.kchaimae.IntegrationTest;
import com.kchaimae.domain.Hopital;
import com.kchaimae.repository.HopitalRepository;
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
 * Integration tests for the {@link HopitalResource} REST controller.
 */
@IntegrationTest
@AutoConfigureMockMvc
@WithMockUser
class HopitalResourceIT {

    private static final String DEFAULT_NOM = "AAAAAAAAAA";
    private static final String UPDATED_NOM = "BBBBBBBBBB";

    private static final String DEFAULT_TELEPHONE = "AAAAAAAAAA";
    private static final String UPDATED_TELEPHONE = "BBBBBBBBBB";

    private static final String DEFAULT_ADRESSE = "AAAAAAAAAA";
    private static final String UPDATED_ADRESSE = "BBBBBBBBBB";

    private static final String DEFAULT_VILLE = "AAAAAAAAAA";
    private static final String UPDATED_VILLE = "BBBBBBBBBB";

    private static final String ENTITY_API_URL = "/api/hopitals";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    private static Random random = new Random();
    private static AtomicLong count = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    @Autowired
    private HopitalRepository hopitalRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restHopitalMockMvc;

    private Hopital hopital;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Hopital createEntity(EntityManager em) {
        Hopital hopital = new Hopital().nom(DEFAULT_NOM).telephone(DEFAULT_TELEPHONE).adresse(DEFAULT_ADRESSE).ville(DEFAULT_VILLE);
        return hopital;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Hopital createUpdatedEntity(EntityManager em) {
        Hopital hopital = new Hopital().nom(UPDATED_NOM).telephone(UPDATED_TELEPHONE).adresse(UPDATED_ADRESSE).ville(UPDATED_VILLE);
        return hopital;
    }

    @BeforeEach
    public void initTest() {
        hopital = createEntity(em);
    }

    @Test
    @Transactional
    void createHopital() throws Exception {
        int databaseSizeBeforeCreate = hopitalRepository.findAll().size();
        // Create the Hopital
        restHopitalMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(hopital)))
            .andExpect(status().isCreated());

        // Validate the Hopital in the database
        List<Hopital> hopitalList = hopitalRepository.findAll();
        assertThat(hopitalList).hasSize(databaseSizeBeforeCreate + 1);
        Hopital testHopital = hopitalList.get(hopitalList.size() - 1);
        assertThat(testHopital.getNom()).isEqualTo(DEFAULT_NOM);
        assertThat(testHopital.getTelephone()).isEqualTo(DEFAULT_TELEPHONE);
        assertThat(testHopital.getAdresse()).isEqualTo(DEFAULT_ADRESSE);
        assertThat(testHopital.getVille()).isEqualTo(DEFAULT_VILLE);
    }

    @Test
    @Transactional
    void createHopitalWithExistingId() throws Exception {
        // Create the Hopital with an existing ID
        hopital.setId(1L);

        int databaseSizeBeforeCreate = hopitalRepository.findAll().size();

        // An entity with an existing ID cannot be created, so this API call must fail
        restHopitalMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(hopital)))
            .andExpect(status().isBadRequest());

        // Validate the Hopital in the database
        List<Hopital> hopitalList = hopitalRepository.findAll();
        assertThat(hopitalList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    void checkNomIsRequired() throws Exception {
        int databaseSizeBeforeTest = hopitalRepository.findAll().size();
        // set the field null
        hopital.setNom(null);

        // Create the Hopital, which fails.

        restHopitalMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(hopital)))
            .andExpect(status().isBadRequest());

        List<Hopital> hopitalList = hopitalRepository.findAll();
        assertThat(hopitalList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    void checkTelephoneIsRequired() throws Exception {
        int databaseSizeBeforeTest = hopitalRepository.findAll().size();
        // set the field null
        hopital.setTelephone(null);

        // Create the Hopital, which fails.

        restHopitalMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(hopital)))
            .andExpect(status().isBadRequest());

        List<Hopital> hopitalList = hopitalRepository.findAll();
        assertThat(hopitalList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    void checkAdresseIsRequired() throws Exception {
        int databaseSizeBeforeTest = hopitalRepository.findAll().size();
        // set the field null
        hopital.setAdresse(null);

        // Create the Hopital, which fails.

        restHopitalMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(hopital)))
            .andExpect(status().isBadRequest());

        List<Hopital> hopitalList = hopitalRepository.findAll();
        assertThat(hopitalList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    void checkVilleIsRequired() throws Exception {
        int databaseSizeBeforeTest = hopitalRepository.findAll().size();
        // set the field null
        hopital.setVille(null);

        // Create the Hopital, which fails.

        restHopitalMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(hopital)))
            .andExpect(status().isBadRequest());

        List<Hopital> hopitalList = hopitalRepository.findAll();
        assertThat(hopitalList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    void getAllHopitals() throws Exception {
        // Initialize the database
        hopitalRepository.saveAndFlush(hopital);

        // Get all the hopitalList
        restHopitalMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(hopital.getId().intValue())))
            .andExpect(jsonPath("$.[*].nom").value(hasItem(DEFAULT_NOM)))
            .andExpect(jsonPath("$.[*].telephone").value(hasItem(DEFAULT_TELEPHONE)))
            .andExpect(jsonPath("$.[*].adresse").value(hasItem(DEFAULT_ADRESSE)))
            .andExpect(jsonPath("$.[*].ville").value(hasItem(DEFAULT_VILLE)));
    }

    @Test
    @Transactional
    void getHopital() throws Exception {
        // Initialize the database
        hopitalRepository.saveAndFlush(hopital);

        // Get the hopital
        restHopitalMockMvc
            .perform(get(ENTITY_API_URL_ID, hopital.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(hopital.getId().intValue()))
            .andExpect(jsonPath("$.nom").value(DEFAULT_NOM))
            .andExpect(jsonPath("$.telephone").value(DEFAULT_TELEPHONE))
            .andExpect(jsonPath("$.adresse").value(DEFAULT_ADRESSE))
            .andExpect(jsonPath("$.ville").value(DEFAULT_VILLE));
    }

    @Test
    @Transactional
    void getNonExistingHopital() throws Exception {
        // Get the hopital
        restHopitalMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    void putExistingHopital() throws Exception {
        // Initialize the database
        hopitalRepository.saveAndFlush(hopital);

        int databaseSizeBeforeUpdate = hopitalRepository.findAll().size();

        // Update the hopital
        Hopital updatedHopital = hopitalRepository.findById(hopital.getId()).get();
        // Disconnect from session so that the updates on updatedHopital are not directly saved in db
        em.detach(updatedHopital);
        updatedHopital.nom(UPDATED_NOM).telephone(UPDATED_TELEPHONE).adresse(UPDATED_ADRESSE).ville(UPDATED_VILLE);

        restHopitalMockMvc
            .perform(
                put(ENTITY_API_URL_ID, updatedHopital.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(updatedHopital))
            )
            .andExpect(status().isOk());

        // Validate the Hopital in the database
        List<Hopital> hopitalList = hopitalRepository.findAll();
        assertThat(hopitalList).hasSize(databaseSizeBeforeUpdate);
        Hopital testHopital = hopitalList.get(hopitalList.size() - 1);
        assertThat(testHopital.getNom()).isEqualTo(UPDATED_NOM);
        assertThat(testHopital.getTelephone()).isEqualTo(UPDATED_TELEPHONE);
        assertThat(testHopital.getAdresse()).isEqualTo(UPDATED_ADRESSE);
        assertThat(testHopital.getVille()).isEqualTo(UPDATED_VILLE);
    }

    @Test
    @Transactional
    void putNonExistingHopital() throws Exception {
        int databaseSizeBeforeUpdate = hopitalRepository.findAll().size();
        hopital.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restHopitalMockMvc
            .perform(
                put(ENTITY_API_URL_ID, hopital.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(hopital))
            )
            .andExpect(status().isBadRequest());

        // Validate the Hopital in the database
        List<Hopital> hopitalList = hopitalRepository.findAll();
        assertThat(hopitalList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithIdMismatchHopital() throws Exception {
        int databaseSizeBeforeUpdate = hopitalRepository.findAll().size();
        hopital.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restHopitalMockMvc
            .perform(
                put(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(hopital))
            )
            .andExpect(status().isBadRequest());

        // Validate the Hopital in the database
        List<Hopital> hopitalList = hopitalRepository.findAll();
        assertThat(hopitalList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithMissingIdPathParamHopital() throws Exception {
        int databaseSizeBeforeUpdate = hopitalRepository.findAll().size();
        hopital.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restHopitalMockMvc
            .perform(put(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(hopital)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the Hopital in the database
        List<Hopital> hopitalList = hopitalRepository.findAll();
        assertThat(hopitalList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void partialUpdateHopitalWithPatch() throws Exception {
        // Initialize the database
        hopitalRepository.saveAndFlush(hopital);

        int databaseSizeBeforeUpdate = hopitalRepository.findAll().size();

        // Update the hopital using partial update
        Hopital partialUpdatedHopital = new Hopital();
        partialUpdatedHopital.setId(hopital.getId());

        partialUpdatedHopital.telephone(UPDATED_TELEPHONE).adresse(UPDATED_ADRESSE).ville(UPDATED_VILLE);

        restHopitalMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedHopital.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedHopital))
            )
            .andExpect(status().isOk());

        // Validate the Hopital in the database
        List<Hopital> hopitalList = hopitalRepository.findAll();
        assertThat(hopitalList).hasSize(databaseSizeBeforeUpdate);
        Hopital testHopital = hopitalList.get(hopitalList.size() - 1);
        assertThat(testHopital.getNom()).isEqualTo(DEFAULT_NOM);
        assertThat(testHopital.getTelephone()).isEqualTo(UPDATED_TELEPHONE);
        assertThat(testHopital.getAdresse()).isEqualTo(UPDATED_ADRESSE);
        assertThat(testHopital.getVille()).isEqualTo(UPDATED_VILLE);
    }

    @Test
    @Transactional
    void fullUpdateHopitalWithPatch() throws Exception {
        // Initialize the database
        hopitalRepository.saveAndFlush(hopital);

        int databaseSizeBeforeUpdate = hopitalRepository.findAll().size();

        // Update the hopital using partial update
        Hopital partialUpdatedHopital = new Hopital();
        partialUpdatedHopital.setId(hopital.getId());

        partialUpdatedHopital.nom(UPDATED_NOM).telephone(UPDATED_TELEPHONE).adresse(UPDATED_ADRESSE).ville(UPDATED_VILLE);

        restHopitalMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedHopital.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedHopital))
            )
            .andExpect(status().isOk());

        // Validate the Hopital in the database
        List<Hopital> hopitalList = hopitalRepository.findAll();
        assertThat(hopitalList).hasSize(databaseSizeBeforeUpdate);
        Hopital testHopital = hopitalList.get(hopitalList.size() - 1);
        assertThat(testHopital.getNom()).isEqualTo(UPDATED_NOM);
        assertThat(testHopital.getTelephone()).isEqualTo(UPDATED_TELEPHONE);
        assertThat(testHopital.getAdresse()).isEqualTo(UPDATED_ADRESSE);
        assertThat(testHopital.getVille()).isEqualTo(UPDATED_VILLE);
    }

    @Test
    @Transactional
    void patchNonExistingHopital() throws Exception {
        int databaseSizeBeforeUpdate = hopitalRepository.findAll().size();
        hopital.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restHopitalMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, hopital.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(hopital))
            )
            .andExpect(status().isBadRequest());

        // Validate the Hopital in the database
        List<Hopital> hopitalList = hopitalRepository.findAll();
        assertThat(hopitalList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithIdMismatchHopital() throws Exception {
        int databaseSizeBeforeUpdate = hopitalRepository.findAll().size();
        hopital.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restHopitalMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(hopital))
            )
            .andExpect(status().isBadRequest());

        // Validate the Hopital in the database
        List<Hopital> hopitalList = hopitalRepository.findAll();
        assertThat(hopitalList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithMissingIdPathParamHopital() throws Exception {
        int databaseSizeBeforeUpdate = hopitalRepository.findAll().size();
        hopital.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restHopitalMockMvc
            .perform(patch(ENTITY_API_URL).contentType("application/merge-patch+json").content(TestUtil.convertObjectToJsonBytes(hopital)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the Hopital in the database
        List<Hopital> hopitalList = hopitalRepository.findAll();
        assertThat(hopitalList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void deleteHopital() throws Exception {
        // Initialize the database
        hopitalRepository.saveAndFlush(hopital);

        int databaseSizeBeforeDelete = hopitalRepository.findAll().size();

        // Delete the hopital
        restHopitalMockMvc
            .perform(delete(ENTITY_API_URL_ID, hopital.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Hopital> hopitalList = hopitalRepository.findAll();
        assertThat(hopitalList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
