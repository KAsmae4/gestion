import { ITypeService, NewTypeService } from './type-service.model';

export const sampleWithRequiredData: ITypeService = {
  id: 46977,
  nom: 'black redundant',
};

export const sampleWithPartialData: ITypeService = {
  id: 85200,
  nom: 'action-items',
};

export const sampleWithFullData: ITypeService = {
  id: 57043,
  nom: 'platforms',
};

export const sampleWithNewData: NewTypeService = {
  nom: 'Denmark Dynamic',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
