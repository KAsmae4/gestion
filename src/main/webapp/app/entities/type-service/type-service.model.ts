export interface ITypeService {
  id: number;
  nom?: string | null;
}

export type NewTypeService = Omit<ITypeService, 'id'> & { id: null };
