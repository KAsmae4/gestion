import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { TypeServiceFormService, TypeServiceFormGroup } from './type-service-form.service';
import { ITypeService } from '../type-service.model';
import { TypeServiceService } from '../service/type-service.service';

@Component({
  selector: 'app-type-service-update',
  templateUrl: './type-service-update.component.html',
})
export class TypeServiceUpdateComponent implements OnInit {
  isSaving = false;
  typeService: ITypeService | null = null;

  editForm: TypeServiceFormGroup = this.typeServiceFormService.createTypeServiceFormGroup();

  constructor(
    protected typeServiceService: TypeServiceService,
    protected typeServiceFormService: TypeServiceFormService,
    protected activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ typeService }) => {
      this.typeService = typeService;
      if (typeService) {
        this.updateForm(typeService);
      }
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const typeService = this.typeServiceFormService.getTypeService(this.editForm);
    if (typeService.id !== null) {
      this.subscribeToSaveResponse(this.typeServiceService.update(typeService));
    } else {
      this.subscribeToSaveResponse(this.typeServiceService.create(typeService));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ITypeService>>): void {
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

  protected updateForm(typeService: ITypeService): void {
    this.typeService = typeService;
    this.typeServiceFormService.resetForm(this.editForm, typeService);
  }
}
