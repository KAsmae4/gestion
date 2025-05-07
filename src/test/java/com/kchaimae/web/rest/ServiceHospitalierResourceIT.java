package com.kchaimae.web.rest;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.kchaimae.IntegrationTest;
import com.kchaimae.domain.ChefService;
import com.kchaimae.domain.Hopital;
import com.kchaimae.domain.ServiceHospitalier;
import com.kchaimae.domain.TypeService;
import com.kchaimae.repository.ServiceHospitalierRepository;
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
 * Integration tests for the {@link ServiceHospitalierResource} REST controller.
 */
@IntegrationTest
@AutoConfigureMockMvc
@WithMockUser
class ServiceHospitalierResourceIT {

    private static final String DEFAULT_NOM = "AAAAAAAAAA";
    private static final String UPDATED_NOM = "BBBBBBBBBB";

    private static final String DEFAULT_EMPLACEMENT = "AAAAAAAAAA";
    private static final String UPDATED_EMPLACEMENT = "BBBBBBBBBB";

    private static final String ENTITY_API_URL = "/api/service-hospitaliers";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    private static Random random = new Random();
    private static AtomicLong count = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    @Autowired
    private ServiceHospitalierRepository serviceHospitalierRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restServiceHospitalierMockMvc;

    private ServiceHospitalier serviceHospitalier;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static ServiceHospitalier createEntity(EntityManager em) {
        ServiceHospitalier serviceHospitalier = new ServiceHospitalier().nom(DEFAULT_NOM).emplacement(DEFAULT_EMPLACEMENT);
        // Add required entity
        TypeService typeService;
        if (TestUtil.findAll(em, TypeService.class).isEmpty()) {
            typeService = TypeServiceResourceIT.createEntity(em);
            em.persist(typeService);
            em.flush();
        } else {
            typeService = TestUtil.findAll(em, TypeService.class).get(0);
        }
        serviceHospitalier.setTypeService(typeService);
        // Add required entity
        ChefService chefService;
        if (TestUtil.findAll(em, ChefService.class).isEmpty()) {
            chefService = ChefServiceResourceIT.createEntity(em);
            em.persist(chefService);
            em.flush();
        } else {
            chefService = TestUtil.findAll(em, ChefService.class).get(0);
        }
        serviceHospitalier.setChefService(chefService);
        // Add required entity
        Hopital hopital;
        if (TestUtil.findAll(em, Hopital.class).isEmpty()) {
            hopital = HopitalResourceIT.createEntity(em);
            em.persist(hopital);
            em.flush();
        } else {
            hopital = TestUtil.findAll(em, Hopital.class).get(0);
        }
        serviceHospitalier.setHopital(hopital);
        return serviceHospitalier;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static ServiceHospitalier createUpdatedEntity(EntityManager em) {
        ServiceHospitalier serviceHospitalier = new ServiceHospitalier().nom(UPDATED_NOM).emplacement(UPDATED_EMPLACEMENT);
        // Add required entity
        TypeService typeService;
        if (TestUtil.findAll(em, TypeService.class).isEmpty()) {
            typeService = TypeServiceResourceIT.createUpdatedEntity(em);
            em.persist(typeService);
            em.flush();
        } else {
            typeService = TestUtil.findAll(em, TypeService.class).get(0);
        }
        serviceHospitalier.setTypeService(typeService);
        // Add required entity
        ChefService chefService;
        if (TestUtil.findAll(em, ChefService.class).isEmpty()) {
            chefService = ChefServiceResourceIT.createUpdatedEntity(em);
            em.persist(chefService);
            em.flush();
        } else {
            chefService = TestUtil.findAll(em, ChefService.class).get(0);
        }
        serviceHospitalier.setChefService(chefService);
        // Add required entity
        Hopital hopital;
        if (TestUtil.findAll(em, Hopital.class).isEmpty()) {
            hopital = HopitalResourceIT.createUpdatedEntity(em);
            em.persist(hopital);
            em.flush();
        } else {
            hopital = TestUtil.findAll(em, Hopital.class).get(0);
        }
        serviceHospitalier.setHopital(hopital);
        return serviceHospitalier;
    }

    @BeforeEach
    public void initTest() {
        serviceHospitalier = createEntity(em);
    }

    @Test
    @Transactional
    void createServiceHospitalier() throws Exception {
        int databaseSizeBeforeCreate = serviceHospitalierRepository.findAll().size();
        // Create the ServiceHospitalier
        restServiceHospitalierMockMvc
            .perform(
                post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(serviceHospitalier))
            )
            .andExpect(status().isCreated());

        // Validate the ServiceHospitalier in the database
        List<ServiceHospitalier> serviceHospitalierList = serviceHospitalierRepository.findAll();
        assertThat(serviceHospitalierList).hasSize(databaseSizeBeforeCreate + 1);
        ServiceHospitalier testServiceHospitalier = serviceHospitalierList.get(serviceHospitalierList.size() - 1);
        assertThat(testServiceHospitalier.getNom()).isEqualTo(DEFAULT_NOM);
        assertThat(testServiceHospitalier.getEmplacement()).isEqualTo(DEFAULT_EMPLACEMENT);
    }

    @Test
    @Transactional
    void createServiceHospitalierWithExistingId() throws Exception {
        // Create the ServiceHospitalier with an existing ID
        serviceHospitalier.setId(1L);

        int databaseSizeBeforeCreate = serviceHospitalierRepository.findAll().size();

        // An entity with an existing ID cannot be created, so this API call must fail
        restServiceHospitalierMockMvc
            .perform(
                post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(serviceHospitalier))
            )
            .andExpect(status().isBadRequest());

        // Validate the ServiceHospitalier in the database
        List<ServiceHospitalier> serviceHospitalierList = serviceHospitalierRepository.findAll();
        assertThat(serviceHospitalierList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    void checkNomIsRequired() throws Exception {
        int databaseSizeBeforeTest = serviceHospitalierRepository.findAll().size();
        // set the field null
        serviceHospitalier.setNom(null);

        // Create the ServiceHospitalier, which fails.

        restServiceHospitalierMockMvc
            .perform(
                post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(serviceHospitalier))
            )
            .andExpect(status().isBadRequest());

        List<ServiceHospitalier> serviceHospitalierList = serviceHospitalierRepository.findAll();
        assertThat(serviceHospitalierList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    void checkEmplacementIsRequired() throws Exception {
        int databaseSizeBeforeTest = serviceHospitalierRepository.findAll().size();
        // set the field null
        serviceHospitalier.setEmplacement(null);

        // Create the ServiceHospitalier, which fails.

        restServiceHospitalierMockMvc
            .perform(
                post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(serviceHospitalier))
            )
            .andExpect(status().isBadRequest());

        List<ServiceHospitalier> serviceHospitalierList = serviceHospitalierRepository.findAll();
        assertThat(serviceHospitalierList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    void getAllServiceHospitaliers() throws Exception {
        // Initialize the database
        serviceHospitalierRepository.saveAndFlush(serviceHospitalier);

        // Get all the serviceHospitalierList
        restServiceHospitalierMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(serviceHospitalier.getId().intValue())))
            .andExpect(jsonPath("$.[*].nom").value(hasItem(DEFAULT_NOM)))
            .andExpect(jsonPath("$.[*].emplacement").value(hasItem(DEFAULT_EMPLACEMENT)));
    }

    @Test
    @Transactional
    void getServiceHospitalier() throws Exception {
        // Initialize the database
        serviceHospitalierRepository.saveAndFlush(serviceHospitalier);

        // Get the serviceHospitalier
        restServiceHospitalierMockMvc
            .perform(get(ENTITY_API_URL_ID, serviceHospitalier.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(serviceHospitalier.getId().intValue()))
            .andExpect(jsonPath("$.nom").value(DEFAULT_NOM))
            .andExpect(jsonPath("$.emplacement").value(DEFAULT_EMPLACEMENT));
    }

    @Test
    @Transactional
    void getNonExistingServiceHospitalier() throws Exception {
        // Get the serviceHospitalier
        restServiceHospitalierMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    void putExistingServiceHospitalier() throws Exception {
        // Initialize the database
        serviceHospitalierRepository.saveAndFlush(serviceHospitalier);

        int databaseSizeBeforeUpdate = serviceHospitalierRepository.findAll().size();

        // Update the serviceHospitalier
        ServiceHospitalier updatedServiceHospitalier = serviceHospitalierRepository.findById(serviceHospitalier.getId()).get();
        // Disconnect from session so that the updates on updatedServiceHospitalier are not directly saved in db
        em.detach(updatedServiceHospitalier);
        updatedServiceHospitalier.nom(UPDATED_NOM).emplacement(UPDATED_EMPLACEMENT);

        restServiceHospitalierMockMvc
            .perform(
                put(ENTITY_API_URL_ID, updatedServiceHospitalier.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(updatedServiceHospitalier))
            )
            .andExpect(status().isOk());

        // Validate the ServiceHospitalier in the database
        List<ServiceHospitalier> serviceHospitalierList = serviceHospitalierRepository.findAll();
        assertThat(serviceHospitalierList).hasSize(databaseSizeBeforeUpdate);
        ServiceHospitalier testServiceHospitalier = serviceHospitalierList.get(serviceHospitalierList.size() - 1);
        assertThat(testServiceHospitalier.getNom()).isEqualTo(UPDATED_NOM);
        assertThat(testServiceHospitalier.getEmplacement()).isEqualTo(UPDATED_EMPLACEMENT);
    }

    @Test
    @Transactional
    void putNonExistingServiceHospitalier() throws Exception {
        int databaseSizeBeforeUpdate = serviceHospitalierRepository.findAll().size();
        serviceHospitalier.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restServiceHospitalierMockMvc
            .perform(
                put(ENTITY_API_URL_ID, serviceHospitalier.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(serviceHospitalier))
            )
            .andExpect(status().isBadRequest());

        // Validate the ServiceHospitalier in the database
        List<ServiceHospitalier> serviceHospitalierList = serviceHospitalierRepository.findAll();
        assertThat(serviceHospitalierList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithIdMismatchServiceHospitalier() throws Exception {
        int databaseSizeBeforeUpdate = serviceHospitalierRepository.findAll().size();
        serviceHospitalier.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restServiceHospitalierMockMvc
            .perform(
                put(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(serviceHospitalier))
            )
            .andExpect(status().isBadRequest());

        // Validate the ServiceHospitalier in the database
        List<ServiceHospitalier> serviceHospitalierList = serviceHospitalierRepository.findAll();
        assertThat(serviceHospitalierList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithMissingIdPathParamServiceHospitalier() throws Exception {
        int databaseSizeBeforeUpdate = serviceHospitalierRepository.findAll().size();
        serviceHospitalier.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restServiceHospitalierMockMvc
            .perform(
                put(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(serviceHospitalier))
            )
            .andExpect(status().isMethodNotAllowed());

        // Validate the ServiceHospitalier in the database
        List<ServiceHospitalier> serviceHospitalierList = serviceHospitalierRepository.findAll();
        assertThat(serviceHospitalierList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void partialUpdateServiceHospitalierWithPatch() throws Exception {
        // Initialize the database
        serviceHospitalierRepository.saveAndFlush(serviceHospitalier);

        int databaseSizeBeforeUpdate = serviceHospitalierRepository.findAll().size();

        // Update the serviceHospitalier using partial update
        ServiceHospitalier partialUpdatedServiceHospitalier = new ServiceHospitalier();
        partialUpdatedServiceHospitalier.setId(serviceHospitalier.getId());

        partialUpdatedServiceHospitalier.nom(UPDATED_NOM);

        restServiceHospitalierMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedServiceHospitalier.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedServiceHospitalier))
            )
            .andExpect(status().isOk());

        // Validate the ServiceHospitalier in the database
        List<ServiceHospitalier> serviceHospitalierList = serviceHospitalierRepository.findAll();
        assertThat(serviceHospitalierList).hasSize(databaseSizeBeforeUpdate);
        ServiceHospitalier testServiceHospitalier = serviceHospitalierList.get(serviceHospitalierList.size() - 1);
        assertThat(testServiceHospitalier.getNom()).isEqualTo(UPDATED_NOM);
        assertThat(testServiceHospitalier.getEmplacement()).isEqualTo(DEFAULT_EMPLACEMENT);
    }

    @Test
    @Transactional
    void fullUpdateServiceHospitalierWithPatch() throws Exception {
        // Initialize the database
        serviceHospitalierRepository.saveAndFlush(serviceHospitalier);

        int databaseSizeBeforeUpdate = serviceHospitalierRepository.findAll().size();

        // Update the serviceHospitalier using partial update
        ServiceHospitalier partialUpdatedServiceHospitalier = new ServiceHospitalier();
        partialUpdatedServiceHospitalier.setId(serviceHospitalier.getId());

        partialUpdatedServiceHospitalier.nom(UPDATED_NOM).emplacement(UPDATED_EMPLACEMENT);

        restServiceHospitalierMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedServiceHospitalier.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedServiceHospitalier))
            )
            .andExpect(status().isOk());

        // Validate the ServiceHospitalier in the database
        List<ServiceHospitalier> serviceHospitalierList = serviceHospitalierRepository.findAll();
        assertThat(serviceHospitalierList).hasSize(databaseSizeBeforeUpdate);
        ServiceHospitalier testServiceHospitalier = serviceHospitalierList.get(serviceHospitalierList.size() - 1);
        assertThat(testServiceHospitalier.getNom()).isEqualTo(UPDATED_NOM);
        assertThat(testServiceHospitalier.getEmplacement()).isEqualTo(UPDATED_EMPLACEMENT);
    }

    @Test
    @Transactional
    void patchNonExistingServiceHospitalier() throws Exception {
        int databaseSizeBeforeUpdate = serviceHospitalierRepository.findAll().size();
        serviceHospitalier.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restServiceHospitalierMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, serviceHospitalier.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(serviceHospitalier))
            )
            .andExpect(status().isBadRequest());

        // Validate the ServiceHospitalier in the database
        List<ServiceHospitalier> serviceHospitalierList = serviceHospitalierRepository.findAll();
        assertThat(serviceHospitalierList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithIdMismatchServiceHospitalier() throws Exception {
        int databaseSizeBeforeUpdate = serviceHospitalierRepository.findAll().size();
        serviceHospitalier.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restServiceHospitalierMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(serviceHospitalier))
            )
            .andExpect(status().isBadRequest());

        // Validate the ServiceHospitalier in the database
        List<ServiceHospitalier> serviceHospitalierList = serviceHospitalierRepository.findAll();
        assertThat(serviceHospitalierList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithMissingIdPathParamServiceHospitalier() throws Exception {
        int databaseSizeBeforeUpdate = serviceHospitalierRepository.findAll().size();
        serviceHospitalier.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restServiceHospitalierMockMvc
            .perform(
                patch(ENTITY_API_URL)
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(serviceHospitalier))
            )
            .andExpect(status().isMethodNotAllowed());

        // Validate the ServiceHospitalier in the database
        List<ServiceHospitalier> serviceHospitalierList = serviceHospitalierRepository.findAll();
        assertThat(serviceHospitalierList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void deleteServiceHospitalier() throws Exception {
        // Initialize the database
        serviceHospitalierRepository.saveAndFlush(serviceHospitalier);

        int databaseSizeBeforeDelete = serviceHospitalierRepository.findAll().size();

        // Delete the serviceHospitalier
        restServiceHospitalierMockMvc
            .perform(delete(ENTITY_API_URL_ID, serviceHospitalier.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<ServiceHospitalier> serviceHospitalierList = serviceHospitalierRepository.findAll();
        assertThat(serviceHospitalierList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
