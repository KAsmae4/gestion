import { IServiceHospitalier, NewServiceHospitalier } from './service-hospitalier.model';

export const sampleWithRequiredData: IServiceHospitalier = {
  id: 24630,
  nom: 'Optimization Bahrain Tunnel',
  emplacement: 'Bacon Sports',
};

export const sampleWithPartialData: IServiceHospitalier = {
  id: 34391,
  nom: 'Cotton SAS',
  emplacement: 'e-tailers engine',
};

export const sampleWithFullData: IServiceHospitalier = {
  id: 50268,
  nom: 'protocol envisioneer interactive',
  emplacement: 'Wooden',
};

export const sampleWithNewData: NewServiceHospitalier = {
  nom: 'framework olive alarm',
  emplacement: 'Triple-buffered Assistant',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
