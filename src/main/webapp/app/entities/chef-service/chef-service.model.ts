export interface IChefService {
  id: number;
  nom?: string | null;
  prenom?: string | null;
  telephone?: string | null;
  email?: string | null;
}

export type NewChefService = Omit<IChefService, 'id'> & { id: null };
