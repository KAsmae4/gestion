import { Component, OnInit } from '@angular/core';
import { TypeFormationService } from '../entities/type-formation/service/type-formation.service';
import { IGroupedTypeFormation } from '../entities/type-formation/type-formation.model';
import { IEtudiant, NewEtudiant } from '../entities/etudiant/etudiant.model';
import { EtudiantFormGroup, EtudiantFormService } from '../entities/etudiant/update/etudiant-form.service';
import { DemandeFormGroup, DemandeFormService } from '../entities/demande/update/demande-form.service';
import { IDemande, NewDemande } from '../entities/demande/demande.model';
import { Validators } from '@angular/forms';
import { StatutDemande } from '../entities/enumerations/statut-demande.model';
import { FormationFormGroup, FormationFormService } from '../entities/formation/update/formation-form.service';
import { IFormation, NewFormation } from '../entities/formation/formation.model';
import { FormulaireDemandeService, IFormulaireDemande } from './formulaire-demande.service';
import { IDocuments, NewDocuments } from '../entities/documents/documents.model';
import { DocumentsFormGroup, DocumentsFormService } from '../entities/documents/update/documents-form.service';
import { DataUtils, FileLoadError } from '../core/util/data-util.service';
import { EventManager, EventWithContent } from '../core/util/event-manager.service';
import { AlertError } from '../shared/alert/alert-error.model';
import { Civilite } from '../entities/enumerations/civilite.model';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-formulaire-demande',
  templateUrl: './formulaire-demande.component.html',
  styleUrls: ['./formulaire-demande.component.scss'],
})
export class FormulaireDemandeComponent implements OnInit {
  steps = [
    { id: 0, title: "Identité de l'interessé", completed: false },
    { id: 1, title: 'Descriptif du stage souhaité', completed: false },
    { id: 2, title: 'Descriptif de la Formation Actuelle', completed: false },
    { id: 3, title: 'Justificatifs', completed: false },
    { id: 4, title: 'Récapitulatif', completed: false },
  ];

  active = 0;
  typesFormation: IGroupedTypeFormation[] = [];
  civiliteValues = Object.keys(Civilite);

  isSaving = false;
  accepterCondition = false;
  success = false;

  etudiant: IEtudiant | NewEtudiant | null = null;
  demande: IDemande | NewDemande | null = null;
  formation: IFormation | NewFormation | null = null;
  documents: IDocuments | NewDocuments | null = null;

  etudiantForm: EtudiantFormGroup = this.etudiantFormService.createEtudiantFormGroup();
  demandeForm: DemandeFormGroup = this.demandeFormService.createDemandeFormGroup();
  formationForm: FormationFormGroup = this.formationFormService.createFormationFormGroup();
  documentsForm: DocumentsFormGroup = this.documentsFormService.createDocumentsFormGroup();

  constructor(
    protected etudiantFormService: EtudiantFormService,
    protected demandeFormService: DemandeFormService,
    protected formationFormService: FormationFormService,
    protected typeFormationService: TypeFormationService,
    protected documentsFormService: DocumentsFormService,
    protected service: FormulaireDemandeService,
    protected dataUtils: DataUtils,
    protected eventManager: EventManager,
    protected sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    this.typeFormationService.queryAll().subscribe({
      next: data => {
        this.typesFormation = data.body!;
      },
    });

    this.demandeForm.controls['statut'].setValue(StatutDemande.DEMANDEE);
    this.demandeForm.controls['etudiant'].removeValidators(Validators.required);
    this.demandeForm.controls['etudiant'].updateValueAndValidity();

    // make all documents required
    this.documentsForm.controls['cv'].addValidators(Validators.required);
    this.documentsForm.controls['cin'].addValidators(Validators.required);
    this.documentsForm.controls['lettreMotivation'].addValidators(Validators.required);
    this.documentsForm.controls['attestationScolarite'].addValidators(Validators.required);
    this.documentsForm.controls['attestationAssurance'].addValidators(Validators.required);
  }

  sanitize(data: string) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(data);
  }

  isFormInvalid(active: number): boolean {
    switch (active) {
      case 0:
        return this.etudiantForm.invalid;
      case 1:
        return this.demandeForm.invalid;
      case 2:
        return this.formationForm.invalid;
      case 3:
        return this.documentsForm.invalid;
      default:
        return false;
    }
  }

  next(): void {
    if (this.active === 0) {
      this.etudiant = this.etudiantFormService.getEtudiant(this.etudiantForm);
    }
    if (this.active === 1) {
      this.demande = this.demandeFormService.getDemande(this.demandeForm);
    }
    if (this.active === 2) {
      this.formation = this.formationFormService.getFormation(this.formationForm);
    }
    if (this.active === 3) {
      this.documents = this.documentsFormService.getDocuments(this.documentsForm);
    }

    if (this.active < this.steps.length) {
      this.steps[this.active].completed = true;
      this.active++;
    }
  }

  previous(): void {
    if (this.active > 0) {
      this.steps[this.active].completed = false;
      this.active--;
    }
  }

  save(): void {
    this.isSaving = true;
    this.success = false;
    if (this.active === 4) {
      this.documents = this.documentsFormService.getDocuments(this.documentsForm);
    }

    const body: IFormulaireDemande = {
      demande: this.demande!,
      formation: this.formation!,
      etudiant: this.etudiant!,
      documents: this.documents!,
    };

    this.service.create(body).subscribe({
      next: () => {
        this.success = true;
        this.isSaving = false;
        this.active = 0;
        for (let i = 0; i < 5; i++) {
          this.steps[i].completed = false;
        }
        this.demandeForm.reset();
        this.formationForm.reset();
        this.etudiantForm.reset();
        this.documentsForm.reset();
      },
    });
  }

  byteSize(base64String: string): string {
    return this.dataUtils.byteSize(base64String);
  }

  openFile(base64String: string, contentType: string | null | undefined): void {
    this.dataUtils.openFile(base64String, contentType);
  }

  setFileData(event: Event, field: string, isImage: boolean): void {
    this.dataUtils.loadFileToForm(event, this.documentsForm, field, isImage).subscribe({
      error: (err: FileLoadError) =>
        this.eventManager.broadcast(
          new EventWithContent<AlertError>('intershipManagementApp.error', { ...err, key: 'error.file.' + err.key })
        ),
    });
  }
}
