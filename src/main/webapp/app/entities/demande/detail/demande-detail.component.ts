import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IDemande } from '../demande.model';
import { IDocuments } from '../../documents/documents.model';
import { DataUtils } from '../../../core/util/data-util.service';
import { DomSanitizer } from '@angular/platform-browser';
import { DemandeService } from '../service/demande.service';
import { StatutDemande } from '../../enumerations/statut-demande.model';

@Component({
  selector: 'app-demande-detail',
  templateUrl: './demande-detail.component.html',
})
export class DemandeDetailComponent implements OnInit {
  demande: IDemande | null = null;
  documents: IDocuments | null = null;

  constructor(
    protected dataUtils: DataUtils,
    protected activatedRoute: ActivatedRoute,
    private sanitizer: DomSanitizer,
    private demandeService: DemandeService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ demande, documents }) => {
      this.demande = demande;

      if (documents.id) {
        this.documents = documents;
      }
    });
  }

  sanitize(data: string) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(data);
  }

  previousState(): void {
    window.history.back();
  }

  byteSize(base64String: string): string {
    return this.dataUtils.byteSize(base64String);
  }

  openFile(base64String: string, contentType: string | null | undefined): void {
    this.dataUtils.openFile(base64String, contentType);
  }

  accepterDemande() {
    if (this.demande) {
      this.demande.statut = StatutDemande.ACCEPTEE;
      this.demandeService.partialUpdate(this.demande).subscribe({
        next: value => console.log('ok'),
      });
    }
  }

  refuserDemande() {
    if (this.demande) {
      this.demande.statut = StatutDemande.REFUSEE;
      this.demandeService.partialUpdate(this.demande).subscribe({
        next: value => console.log('ok'),
      });
    }
  }

  print(): void {}
}
