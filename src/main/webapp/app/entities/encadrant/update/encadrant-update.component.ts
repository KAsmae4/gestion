import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import { EncadrantFormService, EncadrantFormGroup } from './encadrant-form.service';
import { IEncadrant } from '../encadrant.model';
import { EncadrantService } from '../service/encadrant.service';
import { IServiceHospitalier } from 'app/entities/service-hospitalier/service-hospitalier.model';
import { ServiceHospitalierService } from 'app/entities/service-hospitalier/service/service-hospitalier.service';

@Component({
  selector: 'app-encadrant-update',
  templateUrl: './encadrant-update.component.html',
})
export class EncadrantUpdateComponent implements OnInit {
  isSaving = false;
  encadrant: IEncadrant | null = null;

  serviceHospitaliersSharedCollection: IServiceHospitalier[] = [];

  editForm: EncadrantFormGroup = this.encadrantFormService.createEncadrantFormGroup();

  constructor(
    protected encadrantService: EncadrantService,
    protected encadrantFormService: EncadrantFormService,
    protected serviceHospitalierService: ServiceHospitalierService,
    protected activatedRoute: ActivatedRoute
  ) {}

  compareServiceHospitalier = (o1: IServiceHospitalier | null, o2: IServiceHospitalier | null): boolean =>
    this.serviceHospitalierService.compareServiceHospitalier(o1, o2);

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ encadrant }) => {
      this.encadrant = encadrant;
      if (encadrant) {
        this.updateForm(encadrant);
      }

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const encadrant = this.encadrantFormService.getEncadrant(this.editForm);
    if (encadrant.id !== null) {
      this.subscribeToSaveResponse(this.encadrantService.update(encadrant));
    } else {
      this.subscribeToSaveResponse(this.encadrantService.create(encadrant));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IEncadrant>>): void {
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

  protected updateForm(encadrant: IEncadrant): void {
    this.encadrant = encadrant;
    this.encadrantFormService.resetForm(this.editForm, encadrant);

    this.serviceHospitaliersSharedCollection =
      this.serviceHospitalierService.addServiceHospitalierToCollectionIfMissing<IServiceHospitalier>(
        this.serviceHospitaliersSharedCollection,
        encadrant.service
      );
  }

  protected loadRelationshipsOptions(): void {
    this.serviceHospitalierService
      .query()
      .pipe(map((res: HttpResponse<IServiceHospitalier[]>) => res.body ?? []))
      .pipe(
        map((serviceHospitaliers: IServiceHospitalier[]) =>
          this.serviceHospitalierService.addServiceHospitalierToCollectionIfMissing<IServiceHospitalier>(
            serviceHospitaliers,
            this.encadrant?.service
          )
        )
      )
      .subscribe((serviceHospitaliers: IServiceHospitalier[]) => (this.serviceHospitaliersSharedCollection = serviceHospitaliers));
  }
}
