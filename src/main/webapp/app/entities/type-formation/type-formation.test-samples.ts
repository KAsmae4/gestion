import { ITypeFormation, NewTypeFormation } from './type-formation.model';

export const sampleWithRequiredData: ITypeFormation = {
  id: 79182,
  nom: 'Dollar Regional withdrawal',
  type: 'hard',
};

export const sampleWithPartialData: ITypeFormation = {
  id: 4514,
  nom: 'Account actuating Rustic',
  type: 'e-commerce blue Clothing',
};

export const sampleWithFullData: ITypeFormation = {
  id: 66455,
  nom: 'Savings Developer',
  type: 'Strategist back-end Inverse',
};

export const sampleWithNewData: NewTypeFormation = {
  nom: 'Rhode optical Fresh',
  type: 'Ferry solid',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
