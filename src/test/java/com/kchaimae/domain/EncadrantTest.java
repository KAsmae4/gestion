package com.kchaimae.domain;

import static org.assertj.core.api.Assertions.assertThat;

import com.kchaimae.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class EncadrantTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Encadrant.class);
        Encadrant encadrant1 = new Encadrant();
        encadrant1.setId(1L);
        Encadrant encadrant2 = new Encadrant();
        encadrant2.setId(encadrant1.getId());
        assertThat(encadrant1).isEqualTo(encadrant2);
        encadrant2.setId(2L);
        assertThat(encadrant1).isNotEqualTo(encadrant2);
        encadrant1.setId(null);
        assertThat(encadrant1).isNotEqualTo(encadrant2);
    }
}
