import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../service-hospitalier.test-samples';

import { ServiceHospitalierFormService } from './service-hospitalier-form.service';

describe('ServiceHospitalier Form Service', () => {
  let service: ServiceHospitalierFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServiceHospitalierFormService);
  });

  describe('Service methods', () => {
    describe('createServiceHospitalierFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createServiceHospitalierFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            nom: expect.any(Object),
            emplacement: expect.any(Object),
            typeService: expect.any(Object),
            chefService: expect.any(Object),
            hopital: expect.any(Object),
          })
        );
      });

      it('passing IServiceHospitalier should create a new form with FormGroup', () => {
        const formGroup = service.createServiceHospitalierFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            nom: expect.any(Object),
            emplacement: expect.any(Object),
            typeService: expect.any(Object),
            chefService: expect.any(Object),
            hopital: expect.any(Object),
          })
        );
      });
    });

    describe('getServiceHospitalier', () => {
      it('should return NewServiceHospitalier for default ServiceHospitalier initial value', () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const formGroup = service.createServiceHospitalierFormGroup(sampleWithNewData);

        const serviceHospitalier = service.getServiceHospitalier(formGroup) as any;

        expect(serviceHospitalier).toMatchObject(sampleWithNewData);
      });

      it('should return NewServiceHospitalier for empty ServiceHospitalier initial value', () => {
        const formGroup = service.createServiceHospitalierFormGroup();

        const serviceHospitalier = service.getServiceHospitalier(formGroup) as any;

        expect(serviceHospitalier).toMatchObject({});
      });

      it('should return IServiceHospitalier', () => {
        const formGroup = service.createServiceHospitalierFormGroup(sampleWithRequiredData);

        const serviceHospitalier = service.getServiceHospitalier(formGroup) as any;

        expect(serviceHospitalier).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing IServiceHospitalier should not enable id FormControl', () => {
        const formGroup = service.createServiceHospitalierFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewServiceHospitalier should disable id FormControl', () => {
        const formGroup = service.createServiceHospitalierFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
