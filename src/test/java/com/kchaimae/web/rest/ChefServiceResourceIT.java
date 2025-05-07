package com.kchaimae.web.rest;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.kchaimae.IntegrationTest;
import com.kchaimae.domain.ChefService;
import com.kchaimae.repository.ChefServiceRepository;
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
 * Integration tests for the {@link ChefServiceResource} REST controller.
 */
@IntegrationTest
@AutoConfigureMockMvc
@WithMockUser
class ChefServiceResourceIT {

    private static final String DEFAULT_NOM = "AAAAAAAAAA";
    private static final String UPDATED_NOM = "BBBBBBBBBB";

    private static final String DEFAULT_PRENOM = "AAAAAAAAAA";
    private static final String UPDATED_PRENOM = "BBBBBBBBBB";

    private static final String DEFAULT_TELEPHONE = "AAAAAAAAAA";
    private static final String UPDATED_TELEPHONE = "BBBBBBBBBB";

    private static final String DEFAULT_EMAIL = "AAAAAAAAAA";
    private static final String UPDATED_EMAIL = "BBBBBBBBBB";

    private static final String ENTITY_API_URL = "/api/chef-services";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    private static Random random = new Random();
    private static AtomicLong count = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    @Autowired
    private ChefServiceRepository chefServiceRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restChefServiceMockMvc;

    private ChefService chefService;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static ChefService createEntity(EntityManager em) {
        ChefService chefService = new ChefService()
            .nom(DEFAULT_NOM)
            .prenom(DEFAULT_PRENOM)
            .telephone(DEFAULT_TELEPHONE)
            .email(DEFAULT_EMAIL);
        return chefService;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static ChefService createUpdatedEntity(EntityManager em) {
        ChefService chefService = new ChefService()
            .nom(UPDATED_NOM)
            .prenom(UPDATED_PRENOM)
            .telephone(UPDATED_TELEPHONE)
            .email(UPDATED_EMAIL);
        return chefService;
    }

    @BeforeEach
    public void initTest() {
        chefService = createEntity(em);
    }

    @Test
    @Transactional
    void createChefService() throws Exception {
        int databaseSizeBeforeCreate = chefServiceRepository.findAll().size();
        // Create the ChefService
        restChefServiceMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(chefService)))
            .andExpect(status().isCreated());

        // Validate the ChefService in the database
        List<ChefService> chefServiceList = chefServiceRepository.findAll();
        assertThat(chefServiceList).hasSize(databaseSizeBeforeCreate + 1);
        ChefService testChefService = chefServiceList.get(chefServiceList.size() - 1);
        assertThat(testChefService.getNom()).isEqualTo(DEFAULT_NOM);
        assertThat(testChefService.getPrenom()).isEqualTo(DEFAULT_PRENOM);
        assertThat(testChefService.getTelephone()).isEqualTo(DEFAULT_TELEPHONE);
        assertThat(testChefService.getEmail()).isEqualTo(DEFAULT_EMAIL);
    }

    @Test
    @Transactional
    void createChefServiceWithExistingId() throws Exception {
        // Create the ChefService with an existing ID
        chefService.setId(1L);

        int databaseSizeBeforeCreate = chefServiceRepository.findAll().size();

        // An entity with an existing ID cannot be created, so this API call must fail
        restChefServiceMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(chefService)))
            .andExpect(status().isBadRequest());

        // Validate the ChefService in the database
        List<ChefService> chefServiceList = chefServiceRepository.findAll();
        assertThat(chefServiceList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    void checkNomIsRequired() throws Exception {
        int databaseSizeBeforeTest = chefServiceRepository.findAll().size();
        // set the field null
        chefService.setNom(null);

        // Create the ChefService, which fails.

        restChefServiceMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(chefService)))
            .andExpect(status().isBadRequest());

        List<ChefService> chefServiceList = chefServiceRepository.findAll();
        assertThat(chefServiceList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    void checkPrenomIsRequired() throws Exception {
        int databaseSizeBeforeTest = chefServiceRepository.findAll().size();
        // set the field null
        chefService.setPrenom(null);

        // Create the ChefService, which fails.

        restChefServiceMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(chefService)))
            .andExpect(status().isBadRequest());

        List<ChefService> chefServiceList = chefServiceRepository.findAll();
        assertThat(chefServiceList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    void checkTelephoneIsRequired() throws Exception {
        int databaseSizeBeforeTest = chefServiceRepository.findAll().size();
        // set the field null
        chefService.setTelephone(null);

        // Create the ChefService, which fails.

        restChefServiceMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(chefService)))
            .andExpect(status().isBadRequest());

        List<ChefService> chefServiceList = chefServiceRepository.findAll();
        assertThat(chefServiceList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    void checkEmailIsRequired() throws Exception {
        int databaseSizeBeforeTest = chefServiceRepository.findAll().size();
        // set the field null
        chefService.setEmail(null);

        // Create the ChefService, which fails.

        restChefServiceMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(chefService)))
            .andExpect(status().isBadRequest());

        List<ChefService> chefServiceList = chefServiceRepository.findAll();
        assertThat(chefServiceList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    void getAllChefServices() throws Exception {
        // Initialize the database
        chefServiceRepository.saveAndFlush(chefService);

        // Get all the chefServiceList
        restChefServiceMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(chefService.getId().intValue())))
            .andExpect(jsonPath("$.[*].nom").value(hasItem(DEFAULT_NOM)))
            .andExpect(jsonPath("$.[*].prenom").value(hasItem(DEFAULT_PRENOM)))
            .andExpect(jsonPath("$.[*].telephone").value(hasItem(DEFAULT_TELEPHONE)))
            .andExpect(jsonPath("$.[*].email").value(hasItem(DEFAULT_EMAIL)));
    }

    @Test
    @Transactional
    void getChefService() throws Exception {
        // Initialize the database
        chefServiceRepository.saveAndFlush(chefService);

        // Get the chefService
        restChefServiceMockMvc
            .perform(get(ENTITY_API_URL_ID, chefService.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(chefService.getId().intValue()))
            .andExpect(jsonPath("$.nom").value(DEFAULT_NOM))
            .andExpect(jsonPath("$.prenom").value(DEFAULT_PRENOM))
            .andExpect(jsonPath("$.telephone").value(DEFAULT_TELEPHONE))
            .andExpect(jsonPath("$.email").value(DEFAULT_EMAIL));
    }

    @Test
    @Transactional
    void getNonExistingChefService() throws Exception {
        // Get the chefService
        restChefServiceMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    void putExistingChefService() throws Exception {
        // Initialize the database
        chefServiceRepository.saveAndFlush(chefService);

        int databaseSizeBeforeUpdate = chefServiceRepository.findAll().size();

        // Update the chefService
        ChefService updatedChefService = chefServiceRepository.findById(chefService.getId()).get();
        // Disconnect from session so that the updates on updatedChefService are not directly saved in db
        em.detach(updatedChefService);
        updatedChefService.nom(UPDATED_NOM).prenom(UPDATED_PRENOM).telephone(UPDATED_TELEPHONE).email(UPDATED_EMAIL);

        restChefServiceMockMvc
            .perform(
                put(ENTITY_API_URL_ID, updatedChefService.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(updatedChefService))
            )
            .andExpect(status().isOk());

        // Validate the ChefService in the database
        List<ChefService> chefServiceList = chefServiceRepository.findAll();
        assertThat(chefServiceList).hasSize(databaseSizeBeforeUpdate);
        ChefService testChefService = chefServiceList.get(chefServiceList.size() - 1);
        assertThat(testChefService.getNom()).isEqualTo(UPDATED_NOM);
        assertThat(testChefService.getPrenom()).isEqualTo(UPDATED_PRENOM);
        assertThat(testChefService.getTelephone()).isEqualTo(UPDATED_TELEPHONE);
        assertThat(testChefService.getEmail()).isEqualTo(UPDATED_EMAIL);
    }

    @Test
    @Transactional
    void putNonExistingChefService() throws Exception {
        int databaseSizeBeforeUpdate = chefServiceRepository.findAll().size();
        chefService.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restChefServiceMockMvc
            .perform(
                put(ENTITY_API_URL_ID, chefService.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(chefService))
            )
            .andExpect(status().isBadRequest());

        // Validate the ChefService in the database
        List<ChefService> chefServiceList = chefServiceRepository.findAll();
        assertThat(chefServiceList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithIdMismatchChefService() throws Exception {
        int databaseSizeBeforeUpdate = chefServiceRepository.findAll().size();
        chefService.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restChefServiceMockMvc
            .perform(
                put(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(chefService))
            )
            .andExpect(status().isBadRequest());

        // Validate the ChefService in the database
        List<ChefService> chefServiceList = chefServiceRepository.findAll();
        assertThat(chefServiceList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithMissingIdPathParamChefService() throws Exception {
        int databaseSizeBeforeUpdate = chefServiceRepository.findAll().size();
        chefService.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restChefServiceMockMvc
            .perform(put(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(chefService)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the ChefService in the database
        List<ChefService> chefServiceList = chefServiceRepository.findAll();
        assertThat(chefServiceList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void partialUpdateChefServiceWithPatch() throws Exception {
        // Initialize the database
        chefServiceRepository.saveAndFlush(chefService);

        int databaseSizeBeforeUpdate = chefServiceRepository.findAll().size();

        // Update the chefService using partial update
        ChefService partialUpdatedChefService = new ChefService();
        partialUpdatedChefService.setId(chefService.getId());

        partialUpdatedChefService.nom(UPDATED_NOM).prenom(UPDATED_PRENOM);

        restChefServiceMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedChefService.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedChefService))
            )
            .andExpect(status().isOk());

        // Validate the ChefService in the database
        List<ChefService> chefServiceList = chefServiceRepository.findAll();
        assertThat(chefServiceList).hasSize(databaseSizeBeforeUpdate);
        ChefService testChefService = chefServiceList.get(chefServiceList.size() - 1);
        assertThat(testChefService.getNom()).isEqualTo(UPDATED_NOM);
        assertThat(testChefService.getPrenom()).isEqualTo(UPDATED_PRENOM);
        assertThat(testChefService.getTelephone()).isEqualTo(DEFAULT_TELEPHONE);
        assertThat(testChefService.getEmail()).isEqualTo(DEFAULT_EMAIL);
    }

    @Test
    @Transactional
    void fullUpdateChefServiceWithPatch() throws Exception {
        // Initialize the database
        chefServiceRepository.saveAndFlush(chefService);

        int databaseSizeBeforeUpdate = chefServiceRepository.findAll().size();

        // Update the chefService using partial update
        ChefService partialUpdatedChefService = new ChefService();
        partialUpdatedChefService.setId(chefService.getId());

        partialUpdatedChefService.nom(UPDATED_NOM).prenom(UPDATED_PRENOM).telephone(UPDATED_TELEPHONE).email(UPDATED_EMAIL);

        restChefServiceMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedChefService.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedChefService))
            )
            .andExpect(status().isOk());

        // Validate the ChefService in the database
        List<ChefService> chefServiceList = chefServiceRepository.findAll();
        assertThat(chefServiceList).hasSize(databaseSizeBeforeUpdate);
        ChefService testChefService = chefServiceList.get(chefServiceList.size() - 1);
        assertThat(testChefService.getNom()).isEqualTo(UPDATED_NOM);
        assertThat(testChefService.getPrenom()).isEqualTo(UPDATED_PRENOM);
        assertThat(testChefService.getTelephone()).isEqualTo(UPDATED_TELEPHONE);
        assertThat(testChefService.getEmail()).isEqualTo(UPDATED_EMAIL);
    }

    @Test
    @Transactional
    void patchNonExistingChefService() throws Exception {
        int databaseSizeBeforeUpdate = chefServiceRepository.findAll().size();
        chefService.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restChefServiceMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, chefService.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(chefService))
            )
            .andExpect(status().isBadRequest());

        // Validate the ChefService in the database
        List<ChefService> chefServiceList = chefServiceRepository.findAll();
        assertThat(chefServiceList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithIdMismatchChefService() throws Exception {
        int databaseSizeBeforeUpdate = chefServiceRepository.findAll().size();
        chefService.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restChefServiceMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(chefService))
            )
            .andExpect(status().isBadRequest());

        // Validate the ChefService in the database
        List<ChefService> chefServiceList = chefServiceRepository.findAll();
        assertThat(chefServiceList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithMissingIdPathParamChefService() throws Exception {
        int databaseSizeBeforeUpdate = chefServiceRepository.findAll().size();
        chefService.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restChefServiceMockMvc
            .perform(
                patch(ENTITY_API_URL).contentType("application/merge-patch+json").content(TestUtil.convertObjectToJsonBytes(chefService))
            )
            .andExpect(status().isMethodNotAllowed());

        // Validate the ChefService in the database
        List<ChefService> chefServiceList = chefServiceRepository.findAll();
        assertThat(chefServiceList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void deleteChefService() throws Exception {
        // Initialize the database
        chefServiceRepository.saveAndFlush(chefService);

        int databaseSizeBeforeDelete = chefServiceRepository.findAll().size();

        // Delete the chefService
        restChefServiceMockMvc
            .perform(delete(ENTITY_API_URL_ID, chefService.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<ChefService> chefServiceList = chefServiceRepository.findAll();
        assertThat(chefServiceList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
