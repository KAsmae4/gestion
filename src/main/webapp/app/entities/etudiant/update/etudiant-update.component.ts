import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { EtudiantFormService, EtudiantFormGroup } from './etudiant-form.service';
import { IEtudiant } from '../etudiant.model';
import { EtudiantService } from '../service/etudiant.service';
import { StatutDemande } from '../../enumerations/statut-demande.model';
import { Civilite } from '../../enumerations/civilite.model';

@Component({
  selector: 'app-etudiant-update',
  templateUrl: './etudiant-update.component.html',
})
export class EtudiantUpdateComponent implements OnInit {
  isSaving = false;
  etudiant: IEtudiant | null = null;
  civiliteValues = Object.keys(Civilite);

  editForm: EtudiantFormGroup = this.etudiantFormService.createEtudiantFormGroup();

  constructor(
    protected etudiantService: EtudiantService,
    protected etudiantFormService: EtudiantFormService,
    protected activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ etudiant }) => {
      this.etudiant = etudiant;
      if (etudiant) {
        this.updateForm(etudiant);
      }
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const etudiant = this.etudiantFormService.getEtudiant(this.editForm);
    if (etudiant.id !== null) {
      this.subscribeToSaveResponse(this.etudiantService.update(etudiant));
    } else {
      this.subscribeToSaveResponse(this.etudiantService.create(etudiant));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IEtudiant>>): void {
    result.pipe(finalize(() => this.onSaveFinalize())).subscribe({
      next: () => this.onSaveSuccess(),
      error: () => this.onSaveError(),
    });
  }

  protected onSaveSuccess(): void {
    this.previousState();
  }

  protected onSaveError(): void {
    // Api for inheritance.
  }

  protected onSaveFinalize(): void {
    this.isSaving = false;
  }

  protected updateForm(etudiant: IEtudiant): void {
    this.etudiant = etudiant;
    this.etudiantFormService.resetForm(this.editForm, etudiant);
  }
}
