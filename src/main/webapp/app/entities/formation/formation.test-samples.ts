import { IFormation, NewFormation } from './formation.model';

export const sampleWithRequiredData: IFormation = {
  id: 7564,
  nom: 'Norwegian overriding Uruguayo',
  telephone: '838-264-7945',
  adresse: 'Home Junction cross-platform',
  ville: 'Hawaii',
};

export const sampleWithPartialData: IFormation = {
  id: 88005,
  nom: 'Sports hardware',
  telephone: '1-988-834-0251',
  adresse: 'Chief Virginia',
  ville: 'Crossing Implementation',
};

export const sampleWithFullData: IFormation = {
  id: 73232,
  nom: 'GB Mouse',
  telephone: '1-342-785-5849',
  adresse: 'Fantastic New Dynamic',
  ville: 'Mouse drive e-tailers',
};

export const sampleWithNewData: NewFormation = {
  nom: 'benchmark Personal',
  telephone: '835.578.7073',
  adresse: 'payment Money',
  ville: 'Architect Legacy',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
