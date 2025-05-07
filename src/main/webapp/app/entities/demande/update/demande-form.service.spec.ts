import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../demande.test-samples';

import { DemandeFormService } from './demande-form.service';

describe('Demande Form Service', () => {
  let service: DemandeFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DemandeFormService);
  });

  describe('Service methods', () => {
    describe('createDemandeFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createDemandeFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            dateDemande: expect.any(Object),
            dateDebut: expect.any(Object),
            dateFin: expect.any(Object),
            sujet: expect.any(Object),
            statut: expect.any(Object),
            formation: expect.any(Object),
            etudiant: expect.any(Object),
            service: expect.any(Object),
            encadrant: expect.any(Object),
          })
        );
      });

      it('passing IDemande should create a new form with FormGroup', () => {
        const formGroup = service.createDemandeFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            dateDemande: expect.any(Object),
            dateDebut: expect.any(Object),
            dateFin: expect.any(Object),
            sujet: expect.any(Object),
            statut: expect.any(Object),
            formation: expect.any(Object),
            etudiant: expect.any(Object),
            service: expect.any(Object),
            encadrant: expect.any(Object),
          })
        );
      });
    });

    describe('getDemande', () => {
      it('should return NewDemande for default Demande initial value', () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const formGroup = service.createDemandeFormGroup(sampleWithNewData);

        const demande = service.getDemande(formGroup) as any;

        expect(demande).toMatchObject(sampleWithNewData);
      });

      it('should return NewDemande for empty Demande initial value', () => {
        const formGroup = service.createDemandeFormGroup();

        const demande = service.getDemande(formGroup) as any;

        expect(demande).toMatchObject({});
      });

      it('should return IDemande', () => {
        const formGroup = service.createDemandeFormGroup(sampleWithRequiredData);

        const demande = service.getDemande(formGroup) as any;

        expect(demande).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing IDemande should not enable id FormControl', () => {
        const formGroup = service.createDemandeFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewDemande should disable id FormControl', () => {
        const formGroup = service.createDemandeFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
