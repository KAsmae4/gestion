export interface IHopital {
  id: number;
  nom?: string | null;
  telephone?: string | null;
  adresse?: string | null;
  ville?: string | null;
}

export type NewHopital = Omit<IHopital, 'id'> & { id: null };
