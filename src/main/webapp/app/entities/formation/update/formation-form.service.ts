import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { IFormation, NewFormation } from '../formation.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IFormation for edit and NewFormationFormGroupInput for create.
 */
type FormationFormGroupInput = IFormation | PartialWithRequiredKeyOf<NewFormation>;

type FormationFormDefaults = Pick<NewFormation, 'id'>;

type FormationFormGroupContent = {
  id: FormControl<IFormation['id'] | NewFormation['id']>;
  nom: FormControl<IFormation['nom']>;
  nomEtablissement: FormControl<IFormation['nomEtablissement']>;
  telephone: FormControl<IFormation['telephone']>;
  adresse: FormControl<IFormation['adresse']>;
  ville: FormControl<IFormation['ville']>;
  typeFormation: FormControl<IFormation['typeFormation']>;
};

export type FormationFormGroup = FormGroup<FormationFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class FormationFormService {
  createFormationFormGroup(formation: FormationFormGroupInput = { id: null }): FormationFormGroup {
    const formationRawValue = {
      ...this.getFormDefaults(),
      ...formation,
    };
    return new FormGroup<FormationFormGroupContent>({
      id: new FormControl(
        { value: formationRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      nom: new FormControl(formationRawValue.nom, {
        validators: [Validators.required],
      }),
      nomEtablissement: new FormControl(formationRawValue.nomEtablissement, {
        validators: [Validators.required],
      }),
      telephone: new FormControl(formationRawValue.telephone, {
        validators: [Validators.required],
      }),
      adresse: new FormControl(formationRawValue.adresse, {
        validators: [Validators.required],
      }),
      ville: new FormControl(formationRawValue.ville, {
        validators: [Validators.required],
      }),
      typeFormation: new FormControl(formationRawValue.typeFormation, {
        validators: [Validators.required],
      }),
    });
  }

  getFormation(form: FormationFormGroup): IFormation | NewFormation {
    return form.getRawValue() as IFormation | NewFormation;
  }

  resetForm(form: FormationFormGroup, formation: FormationFormGroupInput): void {
    const formationRawValue = { ...this.getFormDefaults(), ...formation };
    form.reset(
      {
        ...formationRawValue,
        id: { value: formationRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): FormationFormDefaults {
    return {
      id: null,
    };
  }
}
