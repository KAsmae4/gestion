import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { IEtudiant, NewEtudiant } from '../etudiant.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IEtudiant for edit and NewEtudiantFormGroupInput for create.
 */
type EtudiantFormGroupInput = IEtudiant | PartialWithRequiredKeyOf<NewEtudiant>;

type EtudiantFormDefaults = Pick<NewEtudiant, 'id'>;

type EtudiantFormGroupContent = {
  id: FormControl<IEtudiant['id'] | NewEtudiant['id']>;
  cin: FormControl<IEtudiant['cin']>;
  civilite: FormControl<IEtudiant['civilite']>;
  nom: FormControl<IEtudiant['nom']>;
  prenom: FormControl<IEtudiant['prenom']>;
  telephone: FormControl<IEtudiant['telephone']>;
  email: FormControl<IEtudiant['email']>;
  dateNaissance: FormControl<IEtudiant['dateNaissance']>;
  adresse: FormControl<IEtudiant['adresse']>;
  ville: FormControl<IEtudiant['ville']>;
};

export type EtudiantFormGroup = FormGroup<EtudiantFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class EtudiantFormService {
  createEtudiantFormGroup(etudiant: EtudiantFormGroupInput = { id: null }): EtudiantFormGroup {
    const etudiantRawValue = {
      ...this.getFormDefaults(),
      ...etudiant,
    };
    return new FormGroup<EtudiantFormGroupContent>({
      id: new FormControl(
        { value: etudiantRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      cin: new FormControl(etudiantRawValue.cin, {
        validators: [Validators.required],
      }),
      civilite: new FormControl(etudiantRawValue.civilite, {
        validators: [Validators.required],
      }),
      nom: new FormControl(etudiantRawValue.nom, {
        validators: [Validators.required],
      }),
      prenom: new FormControl(etudiantRawValue.prenom, {
        validators: [Validators.required],
      }),
      telephone: new FormControl(etudiantRawValue.telephone, {
        validators: [Validators.required],
      }),
      email: new FormControl(etudiantRawValue.email, {
        validators: [Validators.required],
      }),
      dateNaissance: new FormControl(etudiantRawValue.dateNaissance, {
        validators: [Validators.required],
      }),
      adresse: new FormControl(etudiantRawValue.adresse, {
        validators: [Validators.required],
      }),
      ville: new FormControl(etudiantRawValue.ville, {
        validators: [Validators.required],
      }),
    });
  }

  getEtudiant(form: EtudiantFormGroup): IEtudiant | NewEtudiant {
    return form.getRawValue() as IEtudiant | NewEtudiant;
  }

  resetForm(form: EtudiantFormGroup, etudiant: EtudiantFormGroupInput): void {
    const etudiantRawValue = { ...this.getFormDefaults(), ...etudiant };
    form.reset(
      {
        ...etudiantRawValue,
        id: { value: etudiantRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): EtudiantFormDefaults {
    return {
      id: null,
    };
  }
}
