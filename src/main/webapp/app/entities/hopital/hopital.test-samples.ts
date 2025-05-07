import { IHopital, NewHopital } from './hopital.model';

export const sampleWithRequiredData: IHopital = {
  id: 98917,
  nom: 'Central',
  telephone: '756-689-3839 x72065',
  adresse: 'Hat Switzerland hacking',
  ville: 'User-centric',
};

export const sampleWithPartialData: IHopital = {
  id: 62950,
  nom: 'redundant sky',
  telephone: '723.956.5252',
  adresse: 'Nakfa',
  ville: 'haptic',
};

export const sampleWithFullData: IHopital = {
  id: 80412,
  nom: 'schemas EXE Small',
  telephone: '(911) 749-7522 x59231',
  adresse: 'Markets dot-com management',
  ville: 'interfaces',
};

export const sampleWithNewData: NewHopital = {
  nom: 'synergistic parsing transparent',
  telephone: '601.758.5098',
  adresse: 'Armenia',
  ville: 'SMTP Practical Analyst',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
