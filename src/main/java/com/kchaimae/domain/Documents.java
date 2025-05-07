package com.kchaimae.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.io.Serializable;
import javax.persistence.*;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A Documents.
 */
@Entity
@Table(name = "documents")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
@SuppressWarnings("common-java:DuplicatedBlocks")
public class Documents implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Lob
    @Column(name = "cv")
    private byte[] cv;

    @Column(name = "cv_content_type")
    private String cvContentType;

    @Lob
    @Column(name = "cin")
    private byte[] cin;

    @Column(name = "cin_content_type")
    private String cinContentType;

    @Lob
    @Column(name = "lettre_motivation")
    private byte[] lettreMotivation;

    @Column(name = "lettre_motivation_content_type")
    private String lettreMotivationContentType;

    @Lob
    @Column(name = "attestation_scolarite")
    private byte[] attestationScolarite;

    @Column(name = "attestation_scolarite_content_type")
    private String attestationScolariteContentType;

    @Lob
    @Column(name = "attestation_assurance")
    private byte[] attestationAssurance;

    @Column(name = "attestation_assurance_content_type")
    private String attestationAssuranceContentType;

    @JsonIgnoreProperties(value = { "formation", "etudiant", "service", "encadrant", "documents" }, allowSetters = true)
    @OneToOne
    @JoinColumn(unique = true)
    private Demande demande;

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public Documents id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public byte[] getCv() {
        return this.cv;
    }

    public Documents cv(byte[] cv) {
        this.setCv(cv);
        return this;
    }

    public void setCv(byte[] cv) {
        this.cv = cv;
    }

    public byte[] getCin() {
        return this.cin;
    }

    public Documents cin(byte[] cin) {
        this.setCin(cin);
        return this;
    }

    public void setCin(byte[] cin) {
        this.cin = cin;
    }

    public String getCinContentType() {
        return this.cinContentType;
    }

    public Documents cinContentType(String cinContentType) {
        this.setCinContentType(cinContentType);
        return this;
    }

    public void setCinContentType(String cinContentType) {
        this.cinContentType = cinContentType;
    }

    public String getCvContentType() {
        return this.cvContentType;
    }

    public Documents cvContentType(String cvContentType) {
        this.cvContentType = cvContentType;
        return this;
    }

    public void setCvContentType(String cvContentType) {
        this.cvContentType = cvContentType;
    }

    public byte[] getAttestationAssurance() {
        return this.attestationAssurance;
    }

    public Documents attestationAssurance(byte[] attestationAssurance) {
        this.setAttestationAssurance(attestationAssurance);
        return this;
    }

    public void setAttestationAssurance(byte[] attestationAssurance) {
        this.attestationAssurance = attestationAssurance;
    }

    public String getAttestationAssuranceContentType() {
        return this.attestationAssuranceContentType;
    }

    public Documents attestationAssuranceContentType(String attestationAssuranceContentType) {
        this.attestationAssuranceContentType = attestationAssuranceContentType;
        return this;
    }

    public void setAttestationAssuranceContentType(String attestationAssuranceContentType) {
        this.attestationAssuranceContentType = attestationAssuranceContentType;
    }

    public byte[] getLettreMotivation() {
        return lettreMotivation;
    }

    public void setLettreMotivation(byte[] lettreMotivation) {
        this.lettreMotivation = lettreMotivation;
    }

    public String getLettreMotivationContentType() {
        return lettreMotivationContentType;
    }

    public void setLettreMotivationContentType(String lettreMotivationContentType) {
        this.lettreMotivationContentType = lettreMotivationContentType;
    }

    public byte[] getAttestationScolarite() {
        return attestationScolarite;
    }

    public void setAttestationScolarite(byte[] attestationScolarite) {
        this.attestationScolarite = attestationScolarite;
    }

    public String getAttestationScolariteContentType() {
        return attestationScolariteContentType;
    }

    public void setAttestationScolariteContentType(String attestationScolariteContentType) {
        this.attestationScolariteContentType = attestationScolariteContentType;
    }

    public Demande getDemande() {
        return this.demande;
    }

    public void setDemande(Demande demande) {
        this.demande = demande;
    }

    public Documents demande(Demande demande) {
        this.setDemande(demande);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Documents)) {
            return false;
        }
        return id != null && id.equals(((Documents) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Documents{" +
            "id=" + getId() +
            ", cv='" + getCv() + "'" +
            ", cvContentType='" + getCvContentType() + "'" +
            ", attestationAssurance='" + getAttestationAssurance() + "'" +
            ", attestationAssuranceContentType='" + getAttestationAssuranceContentType() + "'" +
            "}";
    }
}
