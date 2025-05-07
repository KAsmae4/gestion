import dayjs from 'dayjs/esm';

export interface IEtudiant {
  id: number;
  cin?: string | null;
  civilite?: string | null;
  nom?: string | null;
  prenom?: string | null;
  telephone?: string | null;
  email?: string | null;
  dateNaissance?: dayjs.Dayjs | null;
  adresse?: string | null;
  ville?: string | null;
}

export type NewEtudiant = Omit<IEtudiant, 'id'> & { id: null };
