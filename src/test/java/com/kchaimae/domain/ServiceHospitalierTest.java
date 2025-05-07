package com.kchaimae.domain;

import static org.assertj.core.api.Assertions.assertThat;

import com.kchaimae.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class ServiceHospitalierTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(ServiceHospitalier.class);
        ServiceHospitalier serviceHospitalier1 = new ServiceHospitalier();
        serviceHospitalier1.setId(1L);
        ServiceHospitalier serviceHospitalier2 = new ServiceHospitalier();
        serviceHospitalier2.setId(serviceHospitalier1.getId());
        assertThat(serviceHospitalier1).isEqualTo(serviceHospitalier2);
        serviceHospitalier2.setId(2L);
        assertThat(serviceHospitalier1).isNotEqualTo(serviceHospitalier2);
        serviceHospitalier1.setId(null);
        assertThat(serviceHospitalier1).isNotEqualTo(serviceHospitalier2);
    }
}
