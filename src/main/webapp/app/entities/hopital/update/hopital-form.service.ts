import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { IHopital, NewHopital } from '../hopital.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IHopital for edit and NewHopitalFormGroupInput for create.
 */
type HopitalFormGroupInput = IHopital | PartialWithRequiredKeyOf<NewHopital>;

type HopitalFormDefaults = Pick<NewHopital, 'id'>;

type HopitalFormGroupContent = {
  id: FormControl<IHopital['id'] | NewHopital['id']>;
  nom: FormControl<IHopital['nom']>;
  telephone: FormControl<IHopital['telephone']>;
  adresse: FormControl<IHopital['adresse']>;
  ville: FormControl<IHopital['ville']>;
};

export type HopitalFormGroup = FormGroup<HopitalFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class HopitalFormService {
  createHopitalFormGroup(hopital: HopitalFormGroupInput = { id: null }): HopitalFormGroup {
    const hopitalRawValue = {
      ...this.getFormDefaults(),
      ...hopital,
    };
    return new FormGroup<HopitalFormGroupContent>({
      id: new FormControl(
        { value: hopitalRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      nom: new FormControl(hopitalRawValue.nom, {
        validators: [Validators.required],
      }),
      telephone: new FormControl(hopitalRawValue.telephone, {
        validators: [Validators.required],
      }),
      adresse: new FormControl(hopitalRawValue.adresse, {
        validators: [Validators.required],
      }),
      ville: new FormControl(hopitalRawValue.ville, {
        validators: [Validators.required],
      }),
    });
  }

  getHopital(form: HopitalFormGroup): IHopital | NewHopital {
    return form.getRawValue() as IHopital | NewHopital;
  }

  resetForm(form: HopitalFormGroup, hopital: HopitalFormGroupInput): void {
    const hopitalRawValue = { ...this.getFormDefaults(), ...hopital };
    form.reset(
      {
        ...hopitalRawValue,
        id: { value: hopitalRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): HopitalFormDefaults {
    return {
      id: null,
    };
  }
}
