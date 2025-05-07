import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IEtudiant } from '../etudiant.model';
import { IDemande } from '../../demande/demande.model';
import { DemandeService } from '../../demande/service/demande.service';

@Component({
  selector: 'app-etudiant-detail',
  templateUrl: './etudiant-detail.component.html',
})
export class EtudiantDetailComponent implements OnInit {
  etudiant: IEtudiant | null = null;
  demandes?: IDemande[] = [];

  constructor(protected activatedRoute: ActivatedRoute, protected demandeService: DemandeService) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ etudiant, demandes }) => {
      this.etudiant = etudiant;
      this.demandes = demandes;
    });
  }

  previousState(): void {
    window.history.back();
  }

  trackId = (_index: number, item: IDemande): number => this.demandeService.getDemandeIdentifier(item);
}
