package com.kchaimae.domain;

import static org.assertj.core.api.Assertions.assertThat;

import com.kchaimae.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class ChefServiceTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(ChefService.class);
        ChefService chefService1 = new ChefService();
        chefService1.setId(1L);
        ChefService chefService2 = new ChefService();
        chefService2.setId(chefService1.getId());
        assertThat(chefService1).isEqualTo(chefService2);
        chefService2.setId(2L);
        assertThat(chefService1).isNotEqualTo(chefService2);
        chefService1.setId(null);
        assertThat(chefService1).isNotEqualTo(chefService2);
    }
}
