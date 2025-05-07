import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { ApplicationConfigService } from '../core/config/application-config.service';
import { IDemande, NewDemande } from '../entities/demande/demande.model';
import { Observable } from 'rxjs';
import { IEtudiant, NewEtudiant } from '../entities/etudiant/etudiant.model';
import { IFormation, NewFormation } from '../entities/formation/formation.model';
import { IDocuments, NewDocuments } from '../entities/documents/documents.model';

@Injectable({
  providedIn: 'root',
})
export class FormulaireDemandeService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/formulaire-demande');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(demande: IFormulaireDemande): Observable<any> {
    return this.http.post(this.resourceUrl, demande, { observe: 'response' });
  }
}

export interface IFormulaireDemande {
  etudiant: IEtudiant | NewEtudiant;
  demande: IDemande | NewDemande;
  formation: IFormation | NewFormation;
  documents: IDocuments | NewDocuments;
}
