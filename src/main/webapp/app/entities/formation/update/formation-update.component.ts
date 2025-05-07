import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import { FormationFormService, FormationFormGroup } from './formation-form.service';
import { IFormation } from '../formation.model';
import { FormationService } from '../service/formation.service';
import { ITypeFormation } from 'app/entities/type-formation/type-formation.model';
import { TypeFormationService } from 'app/entities/type-formation/service/type-formation.service';

@Component({
  selector: 'app-formation-update',
  templateUrl: './formation-update.component.html',
})
export class FormationUpdateComponent implements OnInit {
  isSaving = false;
  formation: IFormation | null = null;

  typeFormationsSharedCollection: ITypeFormation[] = [];

  editForm: FormationFormGroup = this.formationFormService.createFormationFormGroup();

  constructor(
    protected formationService: FormationService,
    protected formationFormService: FormationFormService,
    protected typeFormationService: TypeFormationService,
    protected activatedRoute: ActivatedRoute
  ) {}

  compareTypeFormation = (o1: ITypeFormation | null, o2: ITypeFormation | null): boolean =>
    this.typeFormationService.compareTypeFormation(o1, o2);

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ formation }) => {
      this.formation = formation;
      if (formation) {
        this.updateForm(formation);
      }

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const formation = this.formationFormService.getFormation(this.editForm);
    if (formation.id !== null) {
      this.subscribeToSaveResponse(this.formationService.update(formation));
    } else {
      this.subscribeToSaveResponse(this.formationService.create(formation));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IFormation>>): void {
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

  protected updateForm(formation: IFormation): void {
    this.formation = formation;
    this.formationFormService.resetForm(this.editForm, formation);

    this.typeFormationsSharedCollection = this.typeFormationService.addTypeFormationToCollectionIfMissing<ITypeFormation>(
      this.typeFormationsSharedCollection,
      formation.typeFormation
    );
  }

  protected loadRelationshipsOptions(): void {
    this.typeFormationService
      .query()
      .pipe(map((res: HttpResponse<ITypeFormation[]>) => res.body ?? []))
      .pipe(
        map((typeFormations: ITypeFormation[]) =>
          this.typeFormationService.addTypeFormationToCollectionIfMissing<ITypeFormation>(typeFormations, this.formation?.typeFormation)
        )
      )
      .subscribe((typeFormations: ITypeFormation[]) => (this.typeFormationsSharedCollection = typeFormations));
  }
}
