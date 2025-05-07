import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { IChefService, NewChefService } from '../chef-service.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IChefService for edit and NewChefServiceFormGroupInput for create.
 */
type ChefServiceFormGroupInput = IChefService | PartialWithRequiredKeyOf<NewChefService>;

type ChefServiceFormDefaults = Pick<NewChefService, 'id'>;

type ChefServiceFormGroupContent = {
  id: FormControl<IChefService['id'] | NewChefService['id']>;
  nom: FormControl<IChefService['nom']>;
  prenom: FormControl<IChefService['prenom']>;
  telephone: FormControl<IChefService['telephone']>;
  email: FormControl<IChefService['email']>;
};

export type ChefServiceFormGroup = FormGroup<ChefServiceFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class ChefServiceFormService {
  createChefServiceFormGroup(chefService: ChefServiceFormGroupInput = { id: null }): ChefServiceFormGroup {
    const chefServiceRawValue = {
      ...this.getFormDefaults(),
      ...chefService,
    };
    return new FormGroup<ChefServiceFormGroupContent>({
      id: new FormControl(
        { value: chefServiceRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      nom: new FormControl(chefServiceRawValue.nom, {
        validators: [Validators.required],
      }),
      prenom: new FormControl(chefServiceRawValue.prenom, {
        validators: [Validators.required],
      }),
      telephone: new FormControl(chefServiceRawValue.telephone, {
        validators: [Validators.required],
      }),
      email: new FormControl(chefServiceRawValue.email, {
        validators: [Validators.required],
      }),
    });
  }

  getChefService(form: ChefServiceFormGroup): IChefService | NewChefService {
    return form.getRawValue() as IChefService | NewChefService;
  }

  resetForm(form: ChefServiceFormGroup, chefService: ChefServiceFormGroupInput): void {
    const chefServiceRawValue = { ...this.getFormDefaults(), ...chefService };
    form.reset(
      {
        ...chefServiceRawValue,
        id: { value: chefServiceRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): ChefServiceFormDefaults {
    return {
      id: null,
    };
  }
}
