import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { ITypeService, NewTypeService } from '../type-service.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts ITypeService for edit and NewTypeServiceFormGroupInput for create.
 */
type TypeServiceFormGroupInput = ITypeService | PartialWithRequiredKeyOf<NewTypeService>;

type TypeServiceFormDefaults = Pick<NewTypeService, 'id'>;

type TypeServiceFormGroupContent = {
  id: FormControl<ITypeService['id'] | NewTypeService['id']>;
  nom: FormControl<ITypeService['nom']>;
};

export type TypeServiceFormGroup = FormGroup<TypeServiceFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class TypeServiceFormService {
  createTypeServiceFormGroup(typeService: TypeServiceFormGroupInput = { id: null }): TypeServiceFormGroup {
    const typeServiceRawValue = {
      ...this.getFormDefaults(),
      ...typeService,
    };
    return new FormGroup<TypeServiceFormGroupContent>({
      id: new FormControl(
        { value: typeServiceRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      nom: new FormControl(typeServiceRawValue.nom, {
        validators: [Validators.required],
      }),
    });
  }

  getTypeService(form: TypeServiceFormGroup): ITypeService | NewTypeService {
    return form.getRawValue() as ITypeService | NewTypeService;
  }

  resetForm(form: TypeServiceFormGroup, typeService: TypeServiceFormGroupInput): void {
    const typeServiceRawValue = { ...this.getFormDefaults(), ...typeService };
    form.reset(
      {
        ...typeServiceRawValue,
        id: { value: typeServiceRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): TypeServiceFormDefaults {
    return {
      id: null,
    };
  }
}
