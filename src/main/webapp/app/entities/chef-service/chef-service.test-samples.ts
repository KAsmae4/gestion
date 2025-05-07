import { IChefService, NewChefService } from './chef-service.model';

export const sampleWithRequiredData: IChefService = {
  id: 19839,
  nom: 'Kingdom Games Checking',
  prenom: 'orchid',
  telephone: '(228) 820-8769 x480',
  email: 'Adaline_Durgan21@gmail.com',
};

export const sampleWithPartialData: IChefService = {
  id: 74138,
  nom: 'Automotive',
  prenom: 'parse Dollar',
  telephone: '439.503.4744 x0091',
  email: 'Edgar_Robel@hotmail.com',
};

export const sampleWithFullData: IChefService = {
  id: 33912,
  nom: 'Security Paradigm',
  prenom: 'lavender Associate GB',
  telephone: '(543) 476-0925 x68587',
  email: 'Kelton.Kozey66@gmail.com',
};

export const sampleWithNewData: NewChefService = {
  nom: 'Account niches',
  prenom: 'Pizza back Handcrafted',
  telephone: '728-932-5030 x8780',
  email: 'Leola96@hotmail.com',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
