import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../encadrant.test-samples';

import { EncadrantFormService } from './encadrant-form.service';

describe('Encadrant Form Service', () => {
  let service: EncadrantFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EncadrantFormService);
  });

  describe('Service methods', () => {
    describe('createEncadrantFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createEncadrantFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            nom: expect.any(Object),
            prenom: expect.any(Object),
            telephone: expect.any(Object),
            email: expect.any(Object),
            service: expect.any(Object),
          })
        );
      });

      it('passing IEncadrant should create a new form with FormGroup', () => {
        const formGroup = service.createEncadrantFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            nom: expect.any(Object),
            prenom: expect.any(Object),
            telephone: expect.any(Object),
            email: expect.any(Object),
            service: expect.any(Object),
          })
        );
      });
    });

    describe('getEncadrant', () => {
      it('should return NewEncadrant for default Encadrant initial value', () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const formGroup = service.createEncadrantFormGroup(sampleWithNewData);

        const encadrant = service.getEncadrant(formGroup) as any;

        expect(encadrant).toMatchObject(sampleWithNewData);
      });

      it('should return NewEncadrant for empty Encadrant initial value', () => {
        const formGroup = service.createEncadrantFormGroup();

        const encadrant = service.getEncadrant(formGroup) as any;

        expect(encadrant).toMatchObject({});
      });

      it('should return IEncadrant', () => {
        const formGroup = service.createEncadrantFormGroup(sampleWithRequiredData);

        const encadrant = service.getEncadrant(formGroup) as any;

        expect(encadrant).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing IEncadrant should not enable id FormControl', () => {
        const formGroup = service.createEncadrantFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewEncadrant should disable id FormControl', () => {
        const formGroup = service.createEncadrantFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
