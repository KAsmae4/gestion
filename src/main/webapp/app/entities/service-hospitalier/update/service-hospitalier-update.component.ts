import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import { ServiceHospitalierFormService, ServiceHospitalierFormGroup } from './service-hospitalier-form.service';
import { IServiceHospitalier } from '../service-hospitalier.model';
import { ServiceHospitalierService } from '../service/service-hospitalier.service';
import { ITypeService } from 'app/entities/type-service/type-service.model';
import { TypeServiceService } from 'app/entities/type-service/service/type-service.service';
import { IChefService } from 'app/entities/chef-service/chef-service.model';
import { ChefServiceService } from 'app/entities/chef-service/service/chef-service.service';
import { IHopital } from 'app/entities/hopital/hopital.model';
import { HopitalService } from 'app/entities/hopital/service/hopital.service';

@Component({
  selector: 'app-service-hospitalier-update',
  templateUrl: './service-hospitalier-update.component.html',
})
export class ServiceHospitalierUpdateComponent implements OnInit {
  isSaving = false;
  serviceHospitalier: IServiceHospitalier | null = null;

  typeServicesSharedCollection: ITypeService[] = [];
  chefServicesSharedCollection: IChefService[] = [];
  hopitalsSharedCollection: IHopital[] = [];

  editForm: ServiceHospitalierFormGroup = this.serviceHospitalierFormService.createServiceHospitalierFormGroup();

  constructor(
    protected serviceHospitalierService: ServiceHospitalierService,
    protected serviceHospitalierFormService: ServiceHospitalierFormService,
    protected typeServiceService: TypeServiceService,
    protected chefServiceService: ChefServiceService,
    protected hopitalService: HopitalService,
    protected activatedRoute: ActivatedRoute
  ) {}

  compareTypeService = (o1: ITypeService | null, o2: ITypeService | null): boolean => this.typeServiceService.compareTypeService(o1, o2);

  compareChefService = (o1: IChefService | null, o2: IChefService | null): boolean => this.chefServiceService.compareChefService(o1, o2);

  compareHopital = (o1: IHopital | null, o2: IHopital | null): boolean => this.hopitalService.compareHopital(o1, o2);

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ serviceHospitalier }) => {
      this.serviceHospitalier = serviceHospitalier;
      if (serviceHospitalier) {
        this.updateForm(serviceHospitalier);
      }

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const serviceHospitalier = this.serviceHospitalierFormService.getServiceHospitalier(this.editForm);
    if (serviceHospitalier.id !== null) {
      this.subscribeToSaveResponse(this.serviceHospitalierService.update(serviceHospitalier));
    } else {
      this.subscribeToSaveResponse(this.serviceHospitalierService.create(serviceHospitalier));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IServiceHospitalier>>): void {
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

  protected updateForm(serviceHospitalier: IServiceHospitalier): void {
    this.serviceHospitalier = serviceHospitalier;
    this.serviceHospitalierFormService.resetForm(this.editForm, serviceHospitalier);

    this.typeServicesSharedCollection = this.typeServiceService.addTypeServiceToCollectionIfMissing<ITypeService>(
      this.typeServicesSharedCollection,
      serviceHospitalier.typeService
    );
    this.chefServicesSharedCollection = this.chefServiceService.addChefServiceToCollectionIfMissing<IChefService>(
      this.chefServicesSharedCollection,
      serviceHospitalier.chefService
    );
    this.hopitalsSharedCollection = this.hopitalService.addHopitalToCollectionIfMissing<IHopital>(
      this.hopitalsSharedCollection,
      serviceHospitalier.hopital
    );
  }

  protected loadRelationshipsOptions(): void {
    this.typeServiceService
      .query()
      .pipe(map((res: HttpResponse<ITypeService[]>) => res.body ?? []))
      .pipe(
        map((typeServices: ITypeService[]) =>
          this.typeServiceService.addTypeServiceToCollectionIfMissing<ITypeService>(typeServices, this.serviceHospitalier?.typeService)
        )
      )
      .subscribe((typeServices: ITypeService[]) => (this.typeServicesSharedCollection = typeServices));

    this.chefServiceService
      .query()
      .pipe(map((res: HttpResponse<IChefService[]>) => res.body ?? []))
      .pipe(
        map((chefServices: IChefService[]) =>
          this.chefServiceService.addChefServiceToCollectionIfMissing<IChefService>(chefServices, this.serviceHospitalier?.chefService)
        )
      )
      .subscribe((chefServices: IChefService[]) => (this.chefServicesSharedCollection = chefServices));

    this.hopitalService
      .query()
      .pipe(map((res: HttpResponse<IHopital[]>) => res.body ?? []))
      .pipe(
        map((hopitals: IHopital[]) =>
          this.hopitalService.addHopitalToCollectionIfMissing<IHopital>(hopitals, this.serviceHospitalier?.hopital)
        )
      )
      .subscribe((hopitals: IHopital[]) => (this.hopitalsSharedCollection = hopitals));
  }
}
