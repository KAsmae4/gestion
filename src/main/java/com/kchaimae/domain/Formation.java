package com.kchaimae.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.io.Serializable;
import javax.persistence.*;
import javax.validation.constraints.NotNull;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A Formation.
 */
@Entity
@Table(name = "formation")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
@SuppressWarnings("common-java:DuplicatedBlocks")
public class Formation implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @NotNull
    @Column(name = "nom", nullable = false)
    private String nom;

    @NotNull
    @Column(name = "nom_etablissement", nullable = false)
    private String nomEtablissement;

    @NotNull
    @Column(name = "telephone", nullable = false)
    private String telephone;

    @NotNull
    @Column(name = "adresse", nullable = false)
    private String adresse;

    @NotNull
    @Column(name = "ville", nullable = false)
    private String ville;

    @ManyToOne(optional = false)
    @NotNull
    private TypeFormation typeFormation;

    @JsonIgnoreProperties(value = { "formation", "etudiant", "service", "encadrant" }, allowSetters = true)
    @OneToOne(mappedBy = "formation")
    private Demande demande;

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public Formation id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNom() {
        return this.nom;
    }

    public Formation nom(String nom) {
        this.setNom(nom);
        return this;
    }

    public void setNom(String nom) {
        this.nom = nom;
    }

    public String getNomEtablissement() {
        return this.nomEtablissement;
    }

    public Formation nomEtablissement(String nomEtablissement) {
        this.setNom(nomEtablissement);
        return this;
    }

    public void setNomEtablissement(String nomEtablissement) {
        this.nomEtablissement = nomEtablissement;
    }

    public String getTelephone() {
        return this.telephone;
    }

    public Formation telephone(String telephone) {
        this.setTelephone(telephone);
        return this;
    }

    public void setTelephone(String telephone) {
        this.telephone = telephone;
    }

    public String getAdresse() {
        return this.adresse;
    }

    public Formation adresse(String adresse) {
        this.setAdresse(adresse);
        return this;
    }

    public void setAdresse(String adresse) {
        this.adresse = adresse;
    }

    public String getVille() {
        return this.ville;
    }

    public Formation ville(String ville) {
        this.setVille(ville);
        return this;
    }

    public void setVille(String ville) {
        this.ville = ville;
    }

    public TypeFormation getTypeFormation() {
        return this.typeFormation;
    }

    public void setTypeFormation(TypeFormation typeFormation) {
        this.typeFormation = typeFormation;
    }

    public Formation typeFormation(TypeFormation typeFormation) {
        this.setTypeFormation(typeFormation);
        return this;
    }

    public Demande getDemande() {
        return this.demande;
    }

    public void setDemande(Demande demande) {
        if (this.demande != null) {
            this.demande.setFormation(null);
        }
        if (demande != null) {
            demande.setFormation(this);
        }
        this.demande = demande;
    }

    public Formation demande(Demande demande) {
        this.setDemande(demande);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Formation)) {
            return false;
        }
        return id != null && id.equals(((Formation) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Formation{" +
            "id=" + getId() +
            ", nom='" + getNom() + "'" +
            ", telephone='" + getTelephone() + "'" +
            ", adresse='" + getAdresse() + "'" +
            ", ville='" + getVille() + "'" +
            "}";
    }
}
