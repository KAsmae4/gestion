import { IEncadrant, NewEncadrant } from './encadrant.model';

export const sampleWithRequiredData: IEncadrant = {
  id: 92941,
  nom: 'Team-oriented Buckinghamshire New',
  prenom: 'Internal backing Branding',
  telephone: '(743) 981-7815 x423',
  email: 'Jason_Ullrich@hotmail.com',
};

export const sampleWithPartialData: IEncadrant = {
  id: 14731,
  nom: 'Lanka yellow',
  prenom: 'Home',
  telephone: '972-461-9589',
  email: 'Gerard_Cormier43@yahoo.com',
};

export const sampleWithFullData: IEncadrant = {
  id: 48832,
  nom: 'Malawi',
  prenom: 'Handcrafted interface',
  telephone: '483-306-1664',
  email: 'Toy.Kuvalis61@hotmail.com',
};

export const sampleWithNewData: NewEncadrant = {
  nom: 'invoice Assistant',
  prenom: 'program generate',
  telephone: '364-429-4208 x6391',
  email: 'Henriette95@yahoo.com',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
