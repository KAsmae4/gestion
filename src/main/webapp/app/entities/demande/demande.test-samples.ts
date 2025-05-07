import dayjs from 'dayjs/esm';

import { StatutDemande } from 'app/entities/enumerations/statut-demande.model';

import { IDemande, NewDemande } from './demande.model';

export const sampleWithRequiredData: IDemande = {
  id: 19730,
  dateDebut: dayjs('2023-04-18'),
  dateFin: dayjs('2023-04-18'),
  sujet: 'Hat',
  statut: StatutDemande['DEMANDEE'],
};

export const sampleWithPartialData: IDemande = {
  id: 92710,
  dateDebut: dayjs('2023-04-18'),
  dateFin: dayjs('2023-04-18'),
  sujet: 'Handcrafted Hryvnia',
  statut: StatutDemande['ACCEPTEE'],
};

export const sampleWithFullData: IDemande = {
  id: 4405,
  dateDemande: dayjs('2023-04-18'),
  dateDebut: dayjs('2023-04-18'),
  dateFin: dayjs('2023-04-18'),
  sujet: 'bus Shoes',
  statut: StatutDemande['ACCEPTEE'],
};

export const sampleWithNewData: NewDemande = {
  dateDebut: dayjs('2023-04-18'),
  dateFin: dayjs('2023-04-18'),
  sujet: 'Associate Cedi Manager',
  statut: StatutDemande['REFUSEE'],
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
