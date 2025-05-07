package com.kchaimae.web.rest.vm;

import com.kchaimae.domain.Demande;
import com.kchaimae.domain.Documents;
import com.kchaimae.domain.Etudiant;
import com.kchaimae.domain.Formation;

public class FormulaireDemande {

    private Demande demande;

    private Etudiant etudiant;

    private Formation formation;

    private Documents documents;

    public FormulaireDemande() {}

    public Demande getDemande() {
        return demande;
    }

    public void setDemande(Demande demande) {
        this.demande = demande;
    }

    public Etudiant getEtudiant() {
        return etudiant;
    }

    public void setEtudiant(Etudiant etudiant) {
        this.etudiant = etudiant;
    }

    public Formation getFormation() {
        return formation;
    }

    public void setFormation(Formation formation) {
        this.formation = formation;
    }

    public Documents getDocuments() {
        return documents;
    }

    public void setDocuments(Documents documents) {
        this.documents = documents;
    }
}
