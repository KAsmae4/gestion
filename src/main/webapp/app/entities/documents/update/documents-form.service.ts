import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { IDocuments, NewDocuments } from '../documents.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IDocuments for edit and NewDocumentsFormGroupInput for create.
 */
type DocumentsFormGroupInput = IDocuments | PartialWithRequiredKeyOf<NewDocuments>;

type DocumentsFormDefaults = Pick<NewDocuments, 'id'>;

type DocumentsFormGroupContent = {
  id: FormControl<IDocuments['id'] | NewDocuments['id']>;
  cv: FormControl<IDocuments['cv']>;
  cvContentType: FormControl<IDocuments['cvContentType']>;
  cin: FormControl<IDocuments['cin']>;
  cinContentType: FormControl<IDocuments['cinContentType']>;
  lettreMotivation: FormControl<IDocuments['lettreMotivation']>;
  lettreMotivationContentType: FormControl<IDocuments['lettreMotivationContentType']>;
  attestationScolarite: FormControl<IDocuments['attestationScolarite']>;
  attestationScolariteContentType: FormControl<IDocuments['attestationScolariteContentType']>;
  attestationAssurance: FormControl<IDocuments['attestationAssurance']>;
  attestationAssuranceContentType: FormControl<IDocuments['attestationAssuranceContentType']>;
  demande: FormControl<IDocuments['demande']>;
};

export type DocumentsFormGroup = FormGroup<DocumentsFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class DocumentsFormService {
  createDocumentsFormGroup(documents: DocumentsFormGroupInput = { id: null }): DocumentsFormGroup {
    const documentsRawValue = {
      ...this.getFormDefaults(),
      ...documents,
    };
    return new FormGroup<DocumentsFormGroupContent>({
      id: new FormControl(
        { value: documentsRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      cv: new FormControl(documentsRawValue.cv),
      cvContentType: new FormControl(documentsRawValue.cvContentType),
      cin: new FormControl(documentsRawValue.cin),
      cinContentType: new FormControl(documentsRawValue.cinContentType),
      lettreMotivation: new FormControl(documentsRawValue.lettreMotivation),
      lettreMotivationContentType: new FormControl(documentsRawValue.lettreMotivationContentType),
      attestationScolarite: new FormControl(documentsRawValue.attestationScolarite),
      attestationScolariteContentType: new FormControl(documentsRawValue.attestationScolariteContentType),
      attestationAssurance: new FormControl(documentsRawValue.attestationAssurance),
      attestationAssuranceContentType: new FormControl(documentsRawValue.attestationAssuranceContentType),
      demande: new FormControl(documentsRawValue.demande),
    });
  }

  getDocuments(form: DocumentsFormGroup): IDocuments | NewDocuments {
    return form.getRawValue() as IDocuments | NewDocuments;
  }

  resetForm(form: DocumentsFormGroup, documents: DocumentsFormGroupInput): void {
    const documentsRawValue = { ...this.getFormDefaults(), ...documents };
    form.reset(
      {
        ...documentsRawValue,
        id: { value: documentsRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): DocumentsFormDefaults {
    return {
      id: null,
    };
  }
}
