import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { EncadrantFormService } from './encadrant-form.service';
import { EncadrantService } from '../service/encadrant.service';
import { IEncadrant } from '../encadrant.model';
import { IServiceHospitalier } from 'app/entities/service-hospitalier/service-hospitalier.model';
import { ServiceHospitalierService } from 'app/entities/service-hospitalier/service/service-hospitalier.service';

import { EncadrantUpdateComponent } from './encadrant-update.component';

describe('Encadrant Management Update Component', () => {
  let comp: EncadrantUpdateComponent;
  let fixture: ComponentFixture<EncadrantUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let encadrantFormService: EncadrantFormService;
  let encadrantService: EncadrantService;
  let serviceHospitalierService: ServiceHospitalierService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [EncadrantUpdateComponent],
      providers: [
        FormBuilder,
        {
          provide: ActivatedRoute,
          useValue: {
            params: from([{}]),
          },
        },
      ],
    })
      .overrideTemplate(EncadrantUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(EncadrantUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    encadrantFormService = TestBed.inject(EncadrantFormService);
    encadrantService = TestBed.inject(EncadrantService);
    serviceHospitalierService = TestBed.inject(ServiceHospitalierService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call ServiceHospitalier query and add missing value', () => {
      const encadrant: IEncadrant = { id: 456 };
      const service: IServiceHospitalier = { id: 12005 };
      encadrant.service = service;

      const serviceHospitalierCollection: IServiceHospitalier[] = [{ id: 88066 }];
      jest.spyOn(serviceHospitalierService, 'query').mockReturnValue(of(new HttpResponse({ body: serviceHospitalierCollection })));
      const additionalServiceHospitaliers = [service];
      const expectedCollection: IServiceHospitalier[] = [...additionalServiceHospitaliers, ...serviceHospitalierCollection];
      jest.spyOn(serviceHospitalierService, 'addServiceHospitalierToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ encadrant });
      comp.ngOnInit();

      expect(serviceHospitalierService.query).toHaveBeenCalled();
      expect(serviceHospitalierService.addServiceHospitalierToCollectionIfMissing).toHaveBeenCalledWith(
        serviceHospitalierCollection,
        ...additionalServiceHospitaliers.map(expect.objectContaining)
      );
      expect(comp.serviceHospitaliersSharedCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const encadrant: IEncadrant = { id: 456 };
      const service: IServiceHospitalier = { id: 54850 };
      encadrant.service = service;

      activatedRoute.data = of({ encadrant });
      comp.ngOnInit();

      expect(comp.serviceHospitaliersSharedCollection).toContain(service);
      expect(comp.encadrant).toEqual(encadrant);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IEncadrant>>();
      const encadrant = { id: 123 };
      jest.spyOn(encadrantFormService, 'getEncadrant').mockReturnValue(encadrant);
      jest.spyOn(encadrantService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ encadrant });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: encadrant }));
      saveSubject.complete();

      // THEN
      expect(encadrantFormService.getEncadrant).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(encadrantService.update).toHaveBeenCalledWith(expect.objectContaining(encadrant));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IEncadrant>>();
      const encadrant = { id: 123 };
      jest.spyOn(encadrantFormService, 'getEncadrant').mockReturnValue({ id: null });
      jest.spyOn(encadrantService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ encadrant: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: encadrant }));
      saveSubject.complete();

      // THEN
      expect(encadrantFormService.getEncadrant).toHaveBeenCalled();
      expect(encadrantService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IEncadrant>>();
      const encadrant = { id: 123 };
      jest.spyOn(encadrantService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ encadrant });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(encadrantService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });

  describe('Compare relationships', () => {
    describe('compareServiceHospitalier', () => {
      it('Should forward to serviceHospitalierService', () => {
        const entity = { id: 123 };
        const entity2 = { id: 456 };
        jest.spyOn(serviceHospitalierService, 'compareServiceHospitalier');
        comp.compareServiceHospitalier(entity, entity2);
        expect(serviceHospitalierService.compareServiceHospitalier).toHaveBeenCalledWith(entity, entity2);
      });
    });
  });
});
