import { IDemande } from 'app/entities/demande/demande.model';

export interface IDocuments {
  id: number;
  cv?: string | null;
  cvContentType?: string | null;
  cin?: string | null;
  cinContentType?: string | null;
  lettreMotivation?: string | null;
  lettreMotivationContentType?: string | null;
  attestationScolarite?: string | null;
  attestationScolariteContentType?: string | null;
  attestationAssurance?: string | null;
  attestationAssuranceContentType?: string | null;
  demande?: Pick<IDemande, 'id'> | null;
}

export type NewDocuments = Omit<IDocuments, 'id'> & { id: null };
