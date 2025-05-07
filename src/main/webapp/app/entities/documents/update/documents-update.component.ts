import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import { DocumentsFormService, DocumentsFormGroup } from './documents-form.service';
import { IDocuments } from '../documents.model';
import { DocumentsService } from '../service/documents.service';
import { AlertError } from 'app/shared/alert/alert-error.model';
import { EventManager, EventWithContent } from 'app/core/util/event-manager.service';
import { DataUtils, FileLoadError } from 'app/core/util/data-util.service';
import { IDemande } from 'app/entities/demande/demande.model';
import { DemandeService } from 'app/entities/demande/service/demande.service';

@Component({
  selector: 'app-documents-update',
  templateUrl: './documents-update.component.html',
})
export class DocumentsUpdateComponent implements OnInit {
  isSaving = false;
  documents: IDocuments | null = null;

  demandesCollection: IDemande[] = [];

  editForm: DocumentsFormGroup = this.documentsFormService.createDocumentsFormGroup();

  constructor(
    protected dataUtils: DataUtils,
    protected eventManager: EventManager,
    protected documentsService: DocumentsService,
    protected documentsFormService: DocumentsFormService,
    protected demandeService: DemandeService,
    protected activatedRoute: ActivatedRoute
  ) {}

  compareDemande = (o1: IDemande | null, o2: IDemande | null): boolean => this.demandeService.compareDemande(o1, o2);

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ documents }) => {
      this.documents = documents;
      if (documents) {
        this.updateForm(documents);
      }

      this.loadRelationshipsOptions();
    });
  }

  byteSize(base64String: string): string {
    return this.dataUtils.byteSize(base64String);
  }

  openFile(base64String: string, contentType: string | null | undefined): void {
    this.dataUtils.openFile(base64String, contentType);
  }

  setFileData(event: Event, field: string, isImage: boolean): void {
    this.dataUtils.loadFileToForm(event, this.editForm, field, isImage).subscribe({
      error: (err: FileLoadError) =>
        this.eventManager.broadcast(
          new EventWithContent<AlertError>('intershipManagementApp.error', { ...err, key: 'error.file.' + err.key })
        ),
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const documents = this.documentsFormService.getDocuments(this.editForm);
    if (documents.id !== null) {
      this.subscribeToSaveResponse(this.documentsService.update(documents));
    } else {
      this.subscribeToSaveResponse(this.documentsService.create(documents));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IDocuments>>): void {
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

  protected updateForm(documents: IDocuments): void {
    this.documents = documents;
    this.documentsFormService.resetForm(this.editForm, documents);

    this.demandesCollection = this.demandeService.addDemandeToCollectionIfMissing<IDemande>(this.demandesCollection, documents.demande);
  }

  protected loadRelationshipsOptions(): void {
    this.demandeService
      .query({ filter: 'documents-is-null' })
      .pipe(map((res: HttpResponse<IDemande[]>) => res.body ?? []))
      .pipe(map((demandes: IDemande[]) => this.demandeService.addDemandeToCollectionIfMissing<IDemande>(demandes, this.documents?.demande)))
      .subscribe((demandes: IDemande[]) => (this.demandesCollection = demandes));
  }
}
