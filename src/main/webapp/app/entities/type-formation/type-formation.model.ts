export interface ITypeFormation {
  id: number;
  nom?: string | null;
  type?: string | null;
}

export type NewTypeFormation = Omit<ITypeFormation, 'id'> & { id: null };

export interface IGroupedTypeFormation {
  type?: string;
  types?: ITypeFormation[];
}
