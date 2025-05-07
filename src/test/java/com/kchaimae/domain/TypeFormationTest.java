package com.kchaimae.domain;

import static org.assertj.core.api.Assertions.assertThat;

import com.kchaimae.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class TypeFormationTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(TypeFormation.class);
        TypeFormation typeFormation1 = new TypeFormation();
        typeFormation1.setId(1L);
        TypeFormation typeFormation2 = new TypeFormation();
        typeFormation2.setId(typeFormation1.getId());
        assertThat(typeFormation1).isEqualTo(typeFormation2);
        typeFormation2.setId(2L);
        assertThat(typeFormation1).isNotEqualTo(typeFormation2);
        typeFormation1.setId(null);
        assertThat(typeFormation1).isNotEqualTo(typeFormation2);
    }
}
