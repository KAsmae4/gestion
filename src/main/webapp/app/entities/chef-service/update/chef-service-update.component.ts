import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { ChefServiceFormService, ChefServiceFormGroup } from './chef-service-form.service';
import { IChefService } from '../chef-service.model';
import { ChefServiceService } from '../service/chef-service.service';

@Component({
  selector: 'app-chef-service-update',
  templateUrl: './chef-service-update.component.html',
})
export class ChefServiceUpdateComponent implements OnInit {
  isSaving = false;
  chefService: IChefService | null = null;

  editForm: ChefServiceFormGroup = this.chefServiceFormService.createChefServiceFormGroup();

  constructor(
    protected chefServiceService: ChefServiceService,
    protected chefServiceFormService: ChefServiceFormService,
    protected activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ chefService }) => {
      this.chefService = chefService;
      if (chefService) {
        this.updateForm(chefService);
      }
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const chefService = this.chefServiceFormService.getChefService(this.editForm);
    if (chefService.id !== null) {
      this.subscribeToSaveResponse(this.chefServiceService.update(chefService));
    } else {
      this.subscribeToSaveResponse(this.chefServiceService.create(chefService));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IChefService>>): void {
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

  protected updateForm(chefService: IChefService): void {
    this.chefService = chefService;
    this.chefServiceFormService.resetForm(this.editForm, chefService);
  }
}
