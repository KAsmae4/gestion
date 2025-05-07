package com.kchaimae.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.kchaimae.domain.enumeration.StatutDemande;
import java.io.Serializable;
import java.time.LocalDate;
import javax.persistence.*;
import javax.validation.constraints.NotNull;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A Demande.
 */
@Entity
@Table(name = "demande")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
@SuppressWarnings("common-java:DuplicatedBlocks")
public class Demande implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "date_demande")
    private LocalDate dateDemande;

    @NotNull
    @Column(name = "date_debut", nullable = false)
    private LocalDate dateDebut;

    @NotNull
    @Column(name = "date_fin", nullable = false)
    private LocalDate dateFin;

    @NotNull
    @Column(name = "sujet", nullable = false)
    private String sujet;

    @NotNull
    @Enumerated(EnumType.STRING)
    @Column(name = "statut", nullable = false)
    private StatutDemande statut;

    @JsonIgnoreProperties(value = { "demande" }, allowSetters = true)
    @OneToOne
    @JoinColumn(unique = true)
    private Formation formation;

    @JsonIgnoreProperties(value = { "demande" }, allowSetters = true)
    @OneToOne(mappedBy = "demande")
    private Documents documents;

    @ManyToOne(optional = false)
    @NotNull
    private Etudiant etudiant;

    @ManyToOne
    @JsonIgnoreProperties(value = { "typeService", "chefService", "hopital" }, allowSetters = true)
    private ServiceHospitalier service;

    @ManyToOne
    @JsonIgnoreProperties(value = { "service", "demandes" }, allowSetters = true)
    private Encadrant encadrant;

    @PrePersist
    public void prePersist() {
        dateDemande = LocalDate.now();
    }

    public Long getId() {
        return this.id;
    }

    public Demande id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public LocalDate getDateDemande() {
        return this.dateDemande;
    }

    public Demande dateDemande(LocalDate dateDemande) {
        this.setDateDemande(dateDemande);
        return this;
    }

    public void setDateDemande(LocalDate dateDemande) {
        this.dateDemande = dateDemande;
    }

    public LocalDate getDateDebut() {
        return this.dateDebut;
    }

    public Demande dateDebut(LocalDate dateDebut) {
        this.setDateDebut(dateDebut);
        return this;
    }

    public void setDateDebut(LocalDate dateDebut) {
        this.dateDebut = dateDebut;
    }

    public LocalDate getDateFin() {
        return this.dateFin;
    }

    public Demande dateFin(LocalDate dateFin) {
        this.setDateFin(dateFin);
        return this;
    }

    public void setDateFin(LocalDate dateFin) {
        this.dateFin = dateFin;
    }

    public String getSujet() {
        return this.sujet;
    }

    public Demande sujet(String sujet) {
        this.setSujet(sujet);
        return this;
    }

    public void setSujet(String sujet) {
        this.sujet = sujet;
    }

    public StatutDemande getStatut() {
        return this.statut;
    }

    public Demande statut(StatutDemande statut) {
        this.setStatut(statut);
        return this;
    }

    public void setStatut(StatutDemande statut) {
        this.statut = statut;
    }

    public Formation getFormation() {
        return this.formation;
    }

    public void setFormation(Formation formation) {
        this.formation = formation;
    }

    public Demande formation(Formation formation) {
        this.setFormation(formation);
        return this;
    }

    public Documents getDocuments() {
        return this.documents;
    }

    public void setDocuments(Documents documents) {
        this.documents = documents;
    }

    public Demande documents(Documents documents) {
        this.setDocuments(documents);
        return this;
    }

    public Etudiant getEtudiant() {
        return this.etudiant;
    }

    public void setEtudiant(Etudiant etudiant) {
        this.etudiant = etudiant;
    }

    public Demande etudiant(Etudiant etudiant) {
        this.setEtudiant(etudiant);
        return this;
    }

    public ServiceHospitalier getService() {
        return this.service;
    }

    public void setService(ServiceHospitalier serviceHospitalier) {
        this.service = serviceHospitalier;
    }

    public Demande service(ServiceHospitalier serviceHospitalier) {
        this.setService(serviceHospitalier);
        return this;
    }

    public Encadrant getEncadrant() {
        return this.encadrant;
    }

    public void setEncadrant(Encadrant encadrant) {
        this.encadrant = encadrant;
    }

    public Demande encadrant(Encadrant encadrant) {
        this.setEncadrant(encadrant);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Demande)) {
            return false;
        }
        return id != null && id.equals(((Demande) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Demande{" +
            "id=" + getId() +
            ", dateDemande='" + getDateDemande() + "'" +
            ", dateDebut='" + getDateDebut() + "'" +
            ", dateFin='" + getDateFin() + "'" +
            ", sujet='" + getSujet() + "'" +
            ", statut='" + getStatut() + "'" +
            "}";
    }
}
