import { IDocuments, NewDocuments } from './documents.model';

export const sampleWithRequiredData: IDocuments = {
  id: 7443,
};

export const sampleWithPartialData: IDocuments = {
  id: 60782,
};

export const sampleWithFullData: IDocuments = {
  id: 65860,
  cv: '../fake-data/blob/hipster.png',
  cvContentType: 'unknown',
  attestationAssurance: '../fake-data/blob/hipster.png',
  attestationAssuranceContentType: 'unknown',
};

export const sampleWithNewData: NewDocuments = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
