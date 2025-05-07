import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { IDemande, NewDemande } from '../demande.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IDemande for edit and NewDemandeFormGroupInput for create.
 */
type DemandeFormGroupInput = IDemande | PartialWithRequiredKeyOf<NewDemande>;

type DemandeFormDefaults = Pick<NewDemande, 'id'>;

type DemandeFormGroupContent = {
  id: FormControl<IDemande['id'] | NewDemande['id']>;
  dateDemande: FormControl<IDemande['dateDemande']>;
  dateDebut: FormControl<IDemande['dateDebut']>;
  dateFin: FormControl<IDemande['dateFin']>;
  sujet: FormControl<IDemande['sujet']>;
  statut: FormControl<IDemande['statut']>;
  formation: FormControl<IDemande['formation']>;
  etudiant: FormControl<IDemande['etudiant']>;
  service: FormControl<IDemande['service']>;
  encadrant: FormControl<IDemande['encadrant']>;
};

export type DemandeFormGroup = FormGroup<DemandeFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class DemandeFormService {
  createDemandeFormGroup(demande: DemandeFormGroupInput = { id: null }): DemandeFormGroup {
    const demandeRawValue = {
      ...this.getFormDefaults(),
      ...demande,
    };
    return new FormGroup<DemandeFormGroupContent>({
      id: new FormControl(
        { value: demandeRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      dateDemande: new FormControl(demandeRawValue.dateDemande),
      dateDebut: new FormControl(demandeRawValue.dateDebut, {
        validators: [Validators.required],
      }),
      dateFin: new FormControl(demandeRawValue.dateFin, {
        validators: [Validators.required],
      }),
      sujet: new FormControl(demandeRawValue.sujet, {
        validators: [Validators.required],
      }),
      statut: new FormControl(demandeRawValue.statut, {
        validators: [Validators.required],
      }),
      formation: new FormControl(demandeRawValue.formation),
      etudiant: new FormControl(demandeRawValue.etudiant, {
        validators: [Validators.required],
      }),
      service: new FormControl(demandeRawValue.service),
      encadrant: new FormControl(demandeRawValue.encadrant),
    });
  }

  getDemande(form: DemandeFormGroup): IDemande | NewDemande {
    return form.getRawValue() as IDemande | NewDemande;
  }

  resetForm(form: DemandeFormGroup, demande: DemandeFormGroupInput): void {
    const demandeRawValue = { ...this.getFormDefaults(), ...demande };
    form.reset(
      {
        ...demandeRawValue,
        id: { value: demandeRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): DemandeFormDefaults {
    return {
      id: null,
    };
  }
}
