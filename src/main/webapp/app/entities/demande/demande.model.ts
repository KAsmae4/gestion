import dayjs from 'dayjs/esm';
import { IFormation } from 'app/entities/formation/formation.model';
import { IEtudiant } from 'app/entities/etudiant/etudiant.model';
import { IServiceHospitalier } from 'app/entities/service-hospitalier/service-hospitalier.model';
import { IEncadrant } from 'app/entities/encadrant/encadrant.model';
import { StatutDemande } from 'app/entities/enumerations/statut-demande.model';

export interface IDemande {
  id: number;
  dateDemande?: dayjs.Dayjs | null;
  dateDebut?: dayjs.Dayjs | null;
  dateFin?: dayjs.Dayjs | null;
  sujet?: string | null;
  statut?: StatutDemande | null;
  formation?: Pick<IFormation, 'id' | 'nom' | 'ville' | 'typeFormation' | 'nomEtablissement'> | null;
  etudiant?: Pick<IEtudiant, 'id' | 'nom' | 'prenom' | 'cin' | 'civilite'> | null;
  service?: Pick<IServiceHospitalier, 'id' | 'nom'> | null;
  encadrant?: Pick<IEncadrant, 'id' | 'nom' | 'prenom'> | null;
}

export type NewDemande = Omit<IDemande, 'id'> & { id: null };
