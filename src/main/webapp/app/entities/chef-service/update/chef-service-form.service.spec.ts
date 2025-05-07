import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../chef-service.test-samples';

import { ChefServiceFormService } from './chef-service-form.service';

describe('ChefService Form Service', () => {
  let service: ChefServiceFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChefServiceFormService);
  });

  describe('Service methods', () => {
    describe('createChefServiceFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createChefServiceFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            nom: expect.any(Object),
            prenom: expect.any(Object),
            telephone: expect.any(Object),
            email: expect.any(Object),
          })
        );
      });

      it('passing IChefService should create a new form with FormGroup', () => {
        const formGroup = service.createChefServiceFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            nom: expect.any(Object),
            prenom: expect.any(Object),
            telephone: expect.any(Object),
            email: expect.any(Object),
          })
        );
      });
    });

    describe('getChefService', () => {
      it('should return NewChefService for default ChefService initial value', () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const formGroup = service.createChefServiceFormGroup(sampleWithNewData);

        const chefService = service.getChefService(formGroup) as any;

        expect(chefService).toMatchObject(sampleWithNewData);
      });

      it('should return NewChefService for empty ChefService initial value', () => {
        const formGroup = service.createChefServiceFormGroup();

        const chefService = service.getChefService(formGroup) as any;

        expect(chefService).toMatchObject({});
      });

      it('should return IChefService', () => {
        const formGroup = service.createChefServiceFormGroup(sampleWithRequiredData);

        const chefService = service.getChefService(formGroup) as any;

        expect(chefService).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing IChefService should not enable id FormControl', () => {
        const formGroup = service.createChefServiceFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewChefService should disable id FormControl', () => {
        const formGroup = service.createChefServiceFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
