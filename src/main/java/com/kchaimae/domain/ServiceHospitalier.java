package com.kchaimae.domain;

import java.io.Serializable;
import javax.persistence.*;
import javax.validation.constraints.*;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A ServiceHospitalier.
 */
@Entity
@Table(name = "service_hospitalier")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
@SuppressWarnings("common-java:DuplicatedBlocks")
public class ServiceHospitalier implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @NotNull
    @Column(name = "nom", nullable = false)
    private String nom;

    @NotNull
    @Column(name = "emplacement", nullable = false)
    private String emplacement;

    @ManyToOne(optional = false)
    @NotNull
    private TypeService typeService;

    @ManyToOne(optional = false)
    @NotNull
    private ChefService chefService;

    @ManyToOne(optional = false)
    @NotNull
    private Hopital hopital;

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public ServiceHospitalier id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNom() {
        return this.nom;
    }

    public ServiceHospitalier nom(String nom) {
        this.setNom(nom);
        return this;
    }

    public void setNom(String nom) {
        this.nom = nom;
    }

    public String getEmplacement() {
        return this.emplacement;
    }

    public ServiceHospitalier emplacement(String emplacement) {
        this.setEmplacement(emplacement);
        return this;
    }

    public void setEmplacement(String emplacement) {
        this.emplacement = emplacement;
    }

    public TypeService getTypeService() {
        return this.typeService;
    }

    public void setTypeService(TypeService typeService) {
        this.typeService = typeService;
    }

    public ServiceHospitalier typeService(TypeService typeService) {
        this.setTypeService(typeService);
        return this;
    }

    public ChefService getChefService() {
        return this.chefService;
    }

    public void setChefService(ChefService chefService) {
        this.chefService = chefService;
    }

    public ServiceHospitalier chefService(ChefService chefService) {
        this.setChefService(chefService);
        return this;
    }

    public Hopital getHopital() {
        return this.hopital;
    }

    public void setHopital(Hopital hopital) {
        this.hopital = hopital;
    }

    public ServiceHospitalier hopital(Hopital hopital) {
        this.setHopital(hopital);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof ServiceHospitalier)) {
            return false;
        }
        return id != null && id.equals(((ServiceHospitalier) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "ServiceHospitalier{" +
            "id=" + getId() +
            ", nom='" + getNom() + "'" +
            ", emplacement='" + getEmplacement() + "'" +
            "}";
    }
}
