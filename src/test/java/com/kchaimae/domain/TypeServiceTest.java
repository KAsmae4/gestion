package com.kchaimae.domain;

import static org.assertj.core.api.Assertions.assertThat;

import com.kchaimae.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class TypeServiceTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(TypeService.class);
        TypeService typeService1 = new TypeService();
        typeService1.setId(1L);
        TypeService typeService2 = new TypeService();
        typeService2.setId(typeService1.getId());
        assertThat(typeService1).isEqualTo(typeService2);
        typeService2.setId(2L);
        assertThat(typeService1).isNotEqualTo(typeService2);
        typeService1.setId(null);
        assertThat(typeService1).isNotEqualTo(typeService2);
    }
}
