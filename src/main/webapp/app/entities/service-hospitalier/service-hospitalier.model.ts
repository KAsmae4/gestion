import { ITypeService } from 'app/entities/type-service/type-service.model';
import { IChefService } from 'app/entities/chef-service/chef-service.model';
import { IHopital } from 'app/entities/hopital/hopital.model';

export interface IServiceHospitalier {
  id: number;
  nom?: string | null;
  emplacement?: string | null;
  typeService?: Pick<ITypeService, 'id' | 'nom'> | null;
  chefService?: Pick<IChefService, 'id' | 'nom' | 'prenom'> | null;
  hopital?: Pick<IHopital, 'id' | 'nom'> | null;
}

export type NewServiceHospitalier = Omit<IServiceHospitalier, 'id'> & { id: null };
