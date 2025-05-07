import dayjs from 'dayjs/esm';

import { IEtudiant, NewEtudiant } from './etudiant.model';

export const sampleWithRequiredData: IEtudiant = {
  id: 99461,
  cin: 'EA123123',
  nom: '24/7',
  prenom: 'benchmark Outdoors web-enabled',
  telephone: '929.959.3599',
  email: 'Helga_Kilback55@hotmail.com',
  dateNaissance: dayjs('2023-04-18'),
  adresse: 'red ADP action-items',
  ville: 'systems Lane',
};

export const sampleWithPartialData: IEtudiant = {
  id: 45260,
  cin: 'EA123123',
  nom: 'seamless',
  prenom: 'Cambridgeshire bi-directional Games',
  telephone: '267.634.7091 x093',
  email: 'Julie.Orn@yahoo.com',
  dateNaissance: dayjs('2023-04-17'),
  adresse: 'wireless',
  ville: 'copying Bedfordshire Incredible',
};

export const sampleWithFullData: IEtudiant = {
  id: 46506,
  cin: 'EA123123',
  nom: 'Phased',
  prenom: 'Sports',
  telephone: '225.294.7286 x9650',
  email: 'Shanie_DuBuque21@hotmail.com',
  dateNaissance: dayjs('2023-04-18'),
  adresse: 'solution-oriented',
  ville: 'streamline Supervisor Granite',
};

export const sampleWithNewData: NewEtudiant = {
  cin: 'EA123123',
  nom: 'encryption interface Avon',
  prenom: 'e-markets PCI',
  telephone: '1-371-778-7693 x69075',
  email: 'Elroy90@hotmail.com',
  dateNaissance: dayjs('2023-04-17'),
  adresse: 'Pants',
  ville: 'parsing',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
