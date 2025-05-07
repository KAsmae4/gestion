import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { IServiceHospitalier, NewServiceHospitalier } from '../service-hospitalier.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IServiceHospitalier for edit and NewServiceHospitalierFormGroupInput for create.
 */
type ServiceHospitalierFormGroupInput = IServiceHospitalier | PartialWithRequiredKeyOf<NewServiceHospitalier>;

type ServiceHospitalierFormDefaults = Pick<NewServiceHospitalier, 'id'>;

type ServiceHospitalierFormGroupContent = {
  id: FormControl<IServiceHospitalier['id'] | NewServiceHospitalier['id']>;
  nom: FormControl<IServiceHospitalier['nom']>;
  emplacement: FormControl<IServiceHospitalier['emplacement']>;
  typeService: FormControl<IServiceHospitalier['typeService']>;
  chefService: FormControl<IServiceHospitalier['chefService']>;
  hopital: FormControl<IServiceHospitalier['hopital']>;
};

export type ServiceHospitalierFormGroup = FormGroup<ServiceHospitalierFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class ServiceHospitalierFormService {
  createServiceHospitalierFormGroup(serviceHospitalier: ServiceHospitalierFormGroupInput = { id: null }): ServiceHospitalierFormGroup {
    const serviceHospitalierRawValue = {
      ...this.getFormDefaults(),
      ...serviceHospitalier,
    };
    return new FormGroup<ServiceHospitalierFormGroupContent>({
      id: new FormControl(
        { value: serviceHospitalierRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      nom: new FormControl(serviceHospitalierRawValue.nom, {
        validators: [Validators.required],
      }),
      emplacement: new FormControl(serviceHospitalierRawValue.emplacement, {
        validators: [Validators.required],
      }),
      typeService: new FormControl(serviceHospitalierRawValue.typeService, {
        validators: [Validators.required],
      }),
      chefService: new FormControl(serviceHospitalierRawValue.chefService, {
        validators: [Validators.required],
      }),
      hopital: new FormControl(serviceHospitalierRawValue.hopital, {
        validators: [Validators.required],
      }),
    });
  }

  getServiceHospitalier(form: ServiceHospitalierFormGroup): IServiceHospitalier | NewServiceHospitalier {
    return form.getRawValue() as IServiceHospitalier | NewServiceHospitalier;
  }

  resetForm(form: ServiceHospitalierFormGroup, serviceHospitalier: ServiceHospitalierFormGroupInput): void {
    const serviceHospitalierRawValue = { ...this.getFormDefaults(), ...serviceHospitalier };
    form.reset(
      {
        ...serviceHospitalierRawValue,
        id: { value: serviceHospitalierRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): ServiceHospitalierFormDefaults {
    return {
      id: null,
    };
  }
}
