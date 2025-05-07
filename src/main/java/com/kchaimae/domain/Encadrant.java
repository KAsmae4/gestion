package com.kchaimae.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import javax.persistence.*;
import javax.validation.constraints.*;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A Encadrant.
 */
@Entity
@Table(name = "encadrant")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
@SuppressWarnings("common-java:DuplicatedBlocks")
public class Encadrant implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @NotNull
    @Column(name = "nom", nullable = false)
    private String nom;

    @NotNull
    @Column(name = "prenom", nullable = false)
    private String prenom;

    @NotNull
    @Column(name = "telephone", nullable = false)
    private String telephone;

    @NotNull
    @Column(name = "email", nullable = false)
    private String email;

    @ManyToOne
    @JsonIgnoreProperties(value = { "typeService", "chefService", "hopital" }, allowSetters = true)
    private ServiceHospitalier service;

    @OneToMany(mappedBy = "encadrant")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JsonIgnoreProperties(value = { "etudiant", "service", "encadrant", "formation" }, allowSetters = true)
    private Set<Demande> demandes = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public Encadrant id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNom() {
        return this.nom;
    }

    public Encadrant nom(String nom) {
        this.setNom(nom);
        return this;
    }

    public void setNom(String nom) {
        this.nom = nom;
    }

    public String getPrenom() {
        return this.prenom;
    }

    public Encadrant prenom(String prenom) {
        this.setPrenom(prenom);
        return this;
    }

    public void setPrenom(String prenom) {
        this.prenom = prenom;
    }

    public String getTelephone() {
        return this.telephone;
    }

    public Encadrant telephone(String telephone) {
        this.setTelephone(telephone);
        return this;
    }

    public void setTelephone(String telephone) {
        this.telephone = telephone;
    }

    public String getEmail() {
        return this.email;
    }

    public Encadrant email(String email) {
        this.setEmail(email);
        return this;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public ServiceHospitalier getService() {
        return this.service;
    }

    public void setService(ServiceHospitalier serviceHospitalier) {
        this.service = serviceHospitalier;
    }

    public Encadrant service(ServiceHospitalier serviceHospitalier) {
        this.setService(serviceHospitalier);
        return this;
    }

    public Set<Demande> getDemandes() {
        return this.demandes;
    }

    public void setDemandes(Set<Demande> demandes) {
        if (this.demandes != null) {
            this.demandes.forEach(i -> i.setEncadrant(null));
        }
        if (demandes != null) {
            demandes.forEach(i -> i.setEncadrant(this));
        }
        this.demandes = demandes;
    }

    public Encadrant demandes(Set<Demande> demandes) {
        this.setDemandes(demandes);
        return this;
    }

    public Encadrant addDemande(Demande demande) {
        this.demandes.add(demande);
        demande.setEncadrant(this);
        return this;
    }

    public Encadrant removeDemande(Demande demande) {
        this.demandes.remove(demande);
        demande.setEncadrant(null);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Encadrant)) {
            return false;
        }
        return id != null && id.equals(((Encadrant) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Encadrant{" +
            "id=" + getId() +
            ", nom='" + getNom() + "'" +
            ", prenom='" + getPrenom() + "'" +
            ", telephone='" + getTelephone() + "'" +
            ", email='" + getEmail() + "'" +
            "}";
    }
}
