import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { ServiceHospitalierFormService } from './service-hospitalier-form.service';
import { ServiceHospitalierService } from '../service/service-hospitalier.service';
import { IServiceHospitalier } from '../service-hospitalier.model';
import { ITypeService } from 'app/entities/type-service/type-service.model';
import { TypeServiceService } from 'app/entities/type-service/service/type-service.service';
import { IChefService } from 'app/entities/chef-service/chef-service.model';
import { ChefServiceService } from 'app/entities/chef-service/service/chef-service.service';
import { IHopital } from 'app/entities/hopital/hopital.model';
import { HopitalService } from 'app/entities/hopital/service/hopital.service';

import { ServiceHospitalierUpdateComponent } from './service-hospitalier-update.component';

describe('ServiceHospitalier Management Update Component', () => {
  let comp: ServiceHospitalierUpdateComponent;
  let fixture: ComponentFixture<ServiceHospitalierUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let serviceHospitalierFormService: ServiceHospitalierFormService;
  let serviceHospitalierService: ServiceHospitalierService;
  let typeServiceService: TypeServiceService;
  let chefServiceService: ChefServiceService;
  let hopitalService: HopitalService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [ServiceHospitalierUpdateComponent],
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
      .overrideTemplate(ServiceHospitalierUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(ServiceHospitalierUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    serviceHospitalierFormService = TestBed.inject(ServiceHospitalierFormService);
    serviceHospitalierService = TestBed.inject(ServiceHospitalierService);
    typeServiceService = TestBed.inject(TypeServiceService);
    chefServiceService = TestBed.inject(ChefServiceService);
    hopitalService = TestBed.inject(HopitalService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call TypeService query and add missing value', () => {
      const serviceHospitalier: IServiceHospitalier = { id: 456 };
      const typeService: ITypeService = { id: 43401 };
      serviceHospitalier.typeService = typeService;

      const typeServiceCollection: ITypeService[] = [{ id: 22924 }];
      jest.spyOn(typeServiceService, 'query').mockReturnValue(of(new HttpResponse({ body: typeServiceCollection })));
      const additionalTypeServices = [typeService];
      const expectedCollection: ITypeService[] = [...additionalTypeServices, ...typeServiceCollection];
      jest.spyOn(typeServiceService, 'addTypeServiceToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ serviceHospitalier });
      comp.ngOnInit();

      expect(typeServiceService.query).toHaveBeenCalled();
      expect(typeServiceService.addTypeServiceToCollectionIfMissing).toHaveBeenCalledWith(
        typeServiceCollection,
        ...additionalTypeServices.map(expect.objectContaining)
      );
      expect(comp.typeServicesSharedCollection).toEqual(expectedCollection);
    });

    it('Should call ChefService query and add missing value', () => {
      const serviceHospitalier: IServiceHospitalier = { id: 456 };
      const chefService: IChefService = { id: 70047 };
      serviceHospitalier.chefService = chefService;

      const chefServiceCollection: IChefService[] = [{ id: 19566 }];
      jest.spyOn(chefServiceService, 'query').mockReturnValue(of(new HttpResponse({ body: chefServiceCollection })));
      const additionalChefServices = [chefService];
      const expectedCollection: IChefService[] = [...additionalChefServices, ...chefServiceCollection];
      jest.spyOn(chefServiceService, 'addChefServiceToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ serviceHospitalier });
      comp.ngOnInit();

      expect(chefServiceService.query).toHaveBeenCalled();
      expect(chefServiceService.addChefServiceToCollectionIfMissing).toHaveBeenCalledWith(
        chefServiceCollection,
        ...additionalChefServices.map(expect.objectContaining)
      );
      expect(comp.chefServicesSharedCollection).toEqual(expectedCollection);
    });

    it('Should call Hopital query and add missing value', () => {
      const serviceHospitalier: IServiceHospitalier = { id: 456 };
      const hopital: IHopital = { id: 24717 };
      serviceHospitalier.hopital = hopital;

      const hopitalCollection: IHopital[] = [{ id: 45238 }];
      jest.spyOn(hopitalService, 'query').mockReturnValue(of(new HttpResponse({ body: hopitalCollection })));
      const additionalHopitals = [hopital];
      const expectedCollection: IHopital[] = [...additionalHopitals, ...hopitalCollection];
      jest.spyOn(hopitalService, 'addHopitalToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ serviceHospitalier });
      comp.ngOnInit();

      expect(hopitalService.query).toHaveBeenCalled();
      expect(hopitalService.addHopitalToCollectionIfMissing).toHaveBeenCalledWith(
        hopitalCollection,
        ...additionalHopitals.map(expect.objectContaining)
      );
      expect(comp.hopitalsSharedCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const serviceHospitalier: IServiceHospitalier = { id: 456 };
      const typeService: ITypeService = { id: 42840 };
      serviceHospitalier.typeService = typeService;
      const chefService: IChefService = { id: 50932 };
      serviceHospitalier.chefService = chefService;
      const hopital: IHopital = { id: 49317 };
      serviceHospitalier.hopital = hopital;

      activatedRoute.data = of({ serviceHospitalier });
      comp.ngOnInit();

      expect(comp.typeServicesSharedCollection).toContain(typeService);
      expect(comp.chefServicesSharedCollection).toContain(chefService);
      expect(comp.hopitalsSharedCollection).toContain(hopital);
      expect(comp.serviceHospitalier).toEqual(serviceHospitalier);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IServiceHospitalier>>();
      const serviceHospitalier = { id: 123 };
      jest.spyOn(serviceHospitalierFormService, 'getServiceHospitalier').mockReturnValue(serviceHospitalier);
      jest.spyOn(serviceHospitalierService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ serviceHospitalier });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: serviceHospitalier }));
      saveSubject.complete();

      // THEN
      expect(serviceHospitalierFormService.getServiceHospitalier).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(serviceHospitalierService.update).toHaveBeenCalledWith(expect.objectContaining(serviceHospitalier));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IServiceHospitalier>>();
      const serviceHospitalier = { id: 123 };
      jest.spyOn(serviceHospitalierFormService, 'getServiceHospitalier').mockReturnValue({ id: null });
      jest.spyOn(serviceHospitalierService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ serviceHospitalier: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: serviceHospitalier }));
      saveSubject.complete();

      // THEN
      expect(serviceHospitalierFormService.getServiceHospitalier).toHaveBeenCalled();
      expect(serviceHospitalierService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IServiceHospitalier>>();
      const serviceHospitalier = { id: 123 };
      jest.spyOn(serviceHospitalierService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ serviceHospitalier });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(serviceHospitalierService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });

  describe('Compare relationships', () => {
    describe('compareTypeService', () => {
      it('Should forward to typeServiceService', () => {
        const entity = { id: 123 };
        const entity2 = { id: 456 };
        jest.spyOn(typeServiceService, 'compareTypeService');
        comp.compareTypeService(entity, entity2);
        expect(typeServiceService.compareTypeService).toHaveBeenCalledWith(entity, entity2);
      });
    });

    describe('compareChefService', () => {
      it('Should forward to chefServiceService', () => {
        const entity = { id: 123 };
        const entity2 = { id: 456 };
        jest.spyOn(chefServiceService, 'compareChefService');
        comp.compareChefService(entity, entity2);
        expect(chefServiceService.compareChefService).toHaveBeenCalledWith(entity, entity2);
      });
    });

    describe('compareHopital', () => {
      it('Should forward to hopitalService', () => {
        const entity = { id: 123 };
        const entity2 = { id: 456 };
        jest.spyOn(hopitalService, 'compareHopital');
        comp.compareHopital(entity, entity2);
        expect(hopitalService.compareHopital).toHaveBeenCalledWith(entity, entity2);
      });
    });
  });
});
