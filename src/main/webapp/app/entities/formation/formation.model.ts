import { ITypeFormation } from 'app/entities/type-formation/type-formation.model';

export interface IFormation {
  id: number;
  nom?: string | null;
  nomEtablissement?: string | null;
  telephone?: string | null;
  adresse?: string | null;
  ville?: string | null;
  typeFormation?: Pick<ITypeFormation, 'id' | 'nom'> | null;
}

export type NewFormation = Omit<IFormation, 'id'> & { id: null };
