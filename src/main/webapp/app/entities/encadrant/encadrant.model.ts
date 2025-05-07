import { IServiceHospitalier } from 'app/entities/service-hospitalier/service-hospitalier.model';

export interface IEncadrant {
  id: number;
  nom?: string | null;
  prenom?: string | null;
  telephone?: string | null;
  email?: string | null;
  service?: Pick<IServiceHospitalier, 'id' | 'nom'> | null;
}

export type NewEncadrant = Omit<IEncadrant, 'id'> & { id: null };
