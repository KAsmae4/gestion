import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { IEncadrant, NewEncadrant } from '../encadrant.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IEncadrant for edit and NewEncadrantFormGroupInput for create.
 */
type EncadrantFormGroupInput = IEncadrant | PartialWithRequiredKeyOf<NewEncadrant>;

type EncadrantFormDefaults = Pick<NewEncadrant, 'id'>;

type EncadrantFormGroupContent = {
  id: FormControl<IEncadrant['id'] | NewEncadrant['id']>;
  nom: FormControl<IEncadrant['nom']>;
  prenom: FormControl<IEncadrant['prenom']>;
  telephone: FormControl<IEncadrant['telephone']>;
  email: FormControl<IEncadrant['email']>;
  service: FormControl<IEncadrant['service']>;
};

export type EncadrantFormGroup = FormGroup<EncadrantFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class EncadrantFormService {
  createEncadrantFormGroup(encadrant: EncadrantFormGroupInput = { id: null }): EncadrantFormGroup {
    const encadrantRawValue = {
      ...this.getFormDefaults(),
      ...encadrant,
    };
    return new FormGroup<EncadrantFormGroupContent>({
      id: new FormControl(
        { value: encadrantRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      nom: new FormControl(encadrantRawValue.nom, {
        validators: [Validators.required],
      }),
      prenom: new FormControl(encadrantRawValue.prenom, {
        validators: [Validators.required],
      }),
      telephone: new FormControl(encadrantRawValue.telephone, {
        validators: [Validators.required],
      }),
      email: new FormControl(encadrantRawValue.email, {
        validators: [Validators.required],
      }),
      service: new FormControl(encadrantRawValue.service),
    });
  }

  getEncadrant(form: EncadrantFormGroup): IEncadrant | NewEncadrant {
    return form.getRawValue() as IEncadrant | NewEncadrant;
  }

  resetForm(form: EncadrantFormGroup, encadrant: EncadrantFormGroupInput): void {
    const encadrantRawValue = { ...this.getFormDefaults(), ...encadrant };
    form.reset(
      {
        ...encadrantRawValue,
        id: { value: encadrantRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): EncadrantFormDefaults {
    return {
      id: null,
    };
  }
}
