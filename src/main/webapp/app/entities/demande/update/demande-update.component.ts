import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import { DemandeFormService, DemandeFormGroup } from './demande-form.service';
import { IDemande } from '../demande.model';
import { DemandeService } from '../service/demande.service';
import { IFormation } from 'app/entities/formation/formation.model';
import { FormationService } from 'app/entities/formation/service/formation.service';
import { IEtudiant } from 'app/entities/etudiant/etudiant.model';
import { EtudiantService } from 'app/entities/etudiant/service/etudiant.service';
import { IServiceHospitalier } from 'app/entities/service-hospitalier/service-hospitalier.model';
import { ServiceHospitalierService } from 'app/entities/service-hospitalier/service/service-hospitalier.service';
import { IEncadrant } from 'app/entities/encadrant/encadrant.model';
import { EncadrantService } from 'app/entities/encadrant/service/encadrant.service';
import { StatutDemande } from 'app/entities/enumerations/statut-demande.model';
import { formatDate } from '@angular/common';
import { DATE_TIME_FORMAT } from '../../../config/input.constants';

@Component({
  selector: 'app-demande-update',
  templateUrl: './demande-update.component.html',
})
export class DemandeUpdateComponent implements OnInit {
  isSaving = false;
  demande: IDemande | null = null;
  statutDemandeValues = Object.keys(StatutDemande);

  formationsCollection: IFormation[] = [];
  etudiantsSharedCollection: IEtudiant[] = [];
  serviceHospitaliersSharedCollection: IServiceHospitalier[] = [];
  encadrantsSharedCollection: IEncadrant[] = [];

  editForm: DemandeFormGroup = this.demandeFormService.createDemandeFormGroup();

  constructor(
    protected demandeService: DemandeService,
    protected demandeFormService: DemandeFormService,
    protected formationService: FormationService,
    protected etudiantService: EtudiantService,
    protected serviceHospitalierService: ServiceHospitalierService,
    protected encadrantService: EncadrantService,
    protected activatedRoute: ActivatedRoute
  ) {}

  compareFormation = (o1: IFormation | null, o2: IFormation | null): boolean => this.formationService.compareFormation(o1, o2);

  compareEtudiant = (o1: IEtudiant | null, o2: IEtudiant | null): boolean => this.etudiantService.compareEtudiant(o1, o2);

  compareServiceHospitalier = (o1: IServiceHospitalier | null, o2: IServiceHospitalier | null): boolean =>
    this.serviceHospitalierService.compareServiceHospitalier(o1, o2);

  compareEncadrant = (o1: IEncadrant | null, o2: IEncadrant | null): boolean => this.encadrantService.compareEncadrant(o1, o2);

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ demande }) => {
      this.demande = demande;
      if (demande) {
        this.updateForm(demande);
      }

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const demande = this.demandeFormService.getDemande(this.editForm);
    if (demande.id !== null) {
      this.subscribeToSaveResponse(this.demandeService.update(demande));
    } else {
      this.subscribeToSaveResponse(this.demandeService.create(demande));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IDemande>>): void {
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

  protected updateForm(demande: IDemande): void {
    this.demande = demande;
    this.demandeFormService.resetForm(this.editForm, demande);

    this.formationsCollection = this.formationService.addFormationToCollectionIfMissing<IFormation>(
      this.formationsCollection,
      demande.formation
    );
    this.etudiantsSharedCollection = this.etudiantService.addEtudiantToCollectionIfMissing<IEtudiant>(
      this.etudiantsSharedCollection,
      demande.etudiant
    );
    this.serviceHospitaliersSharedCollection =
      this.serviceHospitalierService.addServiceHospitalierToCollectionIfMissing<IServiceHospitalier>(
        this.serviceHospitaliersSharedCollection,
        demande.service
      );
    this.encadrantsSharedCollection = this.encadrantService.addEncadrantToCollectionIfMissing<IEncadrant>(
      this.encadrantsSharedCollection,
      demande.encadrant
    );
  }

  protected loadRelationshipsOptions(): void {
    this.formationService
      .query({ filter: 'demande-is-null' })
      .pipe(map((res: HttpResponse<IFormation[]>) => res.body ?? []))
      .pipe(
        map((formations: IFormation[]) =>
          this.formationService.addFormationToCollectionIfMissing<IFormation>(formations, this.demande?.formation)
        )
      )
      .subscribe((formations: IFormation[]) => (this.formationsCollection = formations));

    this.etudiantService
      .query()
      .pipe(map((res: HttpResponse<IEtudiant[]>) => res.body ?? []))
      .pipe(
        map((etudiants: IEtudiant[]) => this.etudiantService.addEtudiantToCollectionIfMissing<IEtudiant>(etudiants, this.demande?.etudiant))
      )
      .subscribe((etudiants: IEtudiant[]) => (this.etudiantsSharedCollection = etudiants));

    this.serviceHospitalierService
      .query()
      .pipe(map((res: HttpResponse<IServiceHospitalier[]>) => res.body ?? []))
      .pipe(
        map((serviceHospitaliers: IServiceHospitalier[]) =>
          this.serviceHospitalierService.addServiceHospitalierToCollectionIfMissing<IServiceHospitalier>(
            serviceHospitaliers,
            this.demande?.service
          )
        )
      )
      .subscribe((serviceHospitaliers: IServiceHospitalier[]) => (this.serviceHospitaliersSharedCollection = serviceHospitaliers));

    this.encadrantService
      .query()
      .pipe(map((res: HttpResponse<IEncadrant[]>) => res.body ?? []))
      .pipe(
        map((encadrants: IEncadrant[]) =>
          this.encadrantService.addEncadrantToCollectionIfMissing<IEncadrant>(encadrants, this.demande?.encadrant)
        )
      )
      .subscribe((encadrants: IEncadrant[]) => (this.encadrantsSharedCollection = encadrants));
  }
}
