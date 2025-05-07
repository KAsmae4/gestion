import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { DemandeFormService } from './demande-form.service';
import { DemandeService } from '../service/demande.service';
import { IDemande } from '../demande.model';
import { IFormation } from 'app/entities/formation/formation.model';
import { FormationService } from 'app/entities/formation/service/formation.service';
import { IEtudiant } from 'app/entities/etudiant/etudiant.model';
import { EtudiantService } from 'app/entities/etudiant/service/etudiant.service';
import { IServiceHospitalier } from 'app/entities/service-hospitalier/service-hospitalier.model';
import { ServiceHospitalierService } from 'app/entities/service-hospitalier/service/service-hospitalier.service';
import { IEncadrant } from 'app/entities/encadrant/encadrant.model';
import { EncadrantService } from 'app/entities/encadrant/service/encadrant.service';

import { DemandeUpdateComponent } from './demande-update.component';

describe('Demande Management Update Component', () => {
  let comp: DemandeUpdateComponent;
  let fixture: ComponentFixture<DemandeUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let demandeFormService: DemandeFormService;
  let demandeService: DemandeService;
  let formationService: FormationService;
  let etudiantService: EtudiantService;
  let serviceHospitalierService: ServiceHospitalierService;
  let encadrantService: EncadrantService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [DemandeUpdateComponent],
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
      .overrideTemplate(DemandeUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(DemandeUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    demandeFormService = TestBed.inject(DemandeFormService);
    demandeService = TestBed.inject(DemandeService);
    formationService = TestBed.inject(FormationService);
    etudiantService = TestBed.inject(EtudiantService);
    serviceHospitalierService = TestBed.inject(ServiceHospitalierService);
    encadrantService = TestBed.inject(EncadrantService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call formation query and add missing value', () => {
      const demande: IDemande = { id: 456 };
      const formation: IFormation = { id: 84735 };
      demande.formation = formation;

      const formationCollection: IFormation[] = [{ id: 14513 }];
      jest.spyOn(formationService, 'query').mockReturnValue(of(new HttpResponse({ body: formationCollection })));
      const expectedCollection: IFormation[] = [formation, ...formationCollection];
      jest.spyOn(formationService, 'addFormationToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ demande });
      comp.ngOnInit();

      expect(formationService.query).toHaveBeenCalled();
      expect(formationService.addFormationToCollectionIfMissing).toHaveBeenCalledWith(formationCollection, formation);
      expect(comp.formationsCollection).toEqual(expectedCollection);
    });

    it('Should call Etudiant query and add missing value', () => {
      const demande: IDemande = { id: 456 };
      const etudiant: IEtudiant = { id: 57850 };
      demande.etudiant = etudiant;

      const etudiantCollection: IEtudiant[] = [{ id: 84620 }];
      jest.spyOn(etudiantService, 'query').mockReturnValue(of(new HttpResponse({ body: etudiantCollection })));
      const additionalEtudiants = [etudiant];
      const expectedCollection: IEtudiant[] = [...additionalEtudiants, ...etudiantCollection];
      jest.spyOn(etudiantService, 'addEtudiantToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ demande });
      comp.ngOnInit();

      expect(etudiantService.query).toHaveBeenCalled();
      expect(etudiantService.addEtudiantToCollectionIfMissing).toHaveBeenCalledWith(
        etudiantCollection,
        ...additionalEtudiants.map(expect.objectContaining)
      );
      expect(comp.etudiantsSharedCollection).toEqual(expectedCollection);
    });

    it('Should call ServiceHospitalier query and add missing value', () => {
      const demande: IDemande = { id: 456 };
      const service: IServiceHospitalier = { id: 22692 };
      demande.service = service;

      const serviceHospitalierCollection: IServiceHospitalier[] = [{ id: 660 }];
      jest.spyOn(serviceHospitalierService, 'query').mockReturnValue(of(new HttpResponse({ body: serviceHospitalierCollection })));
      const additionalServiceHospitaliers = [service];
      const expectedCollection: IServiceHospitalier[] = [...additionalServiceHospitaliers, ...serviceHospitalierCollection];
      jest.spyOn(serviceHospitalierService, 'addServiceHospitalierToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ demande });
      comp.ngOnInit();

      expect(serviceHospitalierService.query).toHaveBeenCalled();
      expect(serviceHospitalierService.addServiceHospitalierToCollectionIfMissing).toHaveBeenCalledWith(
        serviceHospitalierCollection,
        ...additionalServiceHospitaliers.map(expect.objectContaining)
      );
      expect(comp.serviceHospitaliersSharedCollection).toEqual(expectedCollection);
    });

    it('Should call Encadrant query and add missing value', () => {
      const demande: IDemande = { id: 456 };
      const encadrant: IEncadrant = { id: 2716 };
      demande.encadrant = encadrant;

      const encadrantCollection: IEncadrant[] = [{ id: 20923 }];
      jest.spyOn(encadrantService, 'query').mockReturnValue(of(new HttpResponse({ body: encadrantCollection })));
      const additionalEncadrants = [encadrant];
      const expectedCollection: IEncadrant[] = [...additionalEncadrants, ...encadrantCollection];
      jest.spyOn(encadrantService, 'addEncadrantToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ demande });
      comp.ngOnInit();

      expect(encadrantService.query).toHaveBeenCalled();
      expect(encadrantService.addEncadrantToCollectionIfMissing).toHaveBeenCalledWith(
        encadrantCollection,
        ...additionalEncadrants.map(expect.objectContaining)
      );
      expect(comp.encadrantsSharedCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const demande: IDemande = { id: 456 };
      const formation: IFormation = { id: 34016 };
      demande.formation = formation;
      const etudiant: IEtudiant = { id: 76887 };
      demande.etudiant = etudiant;
      const service: IServiceHospitalier = { id: 98913 };
      demande.service = service;
      const encadrant: IEncadrant = { id: 64832 };
      demande.encadrant = encadrant;

      activatedRoute.data = of({ demande });
      comp.ngOnInit();

      expect(comp.formationsCollection).toContain(formation);
      expect(comp.etudiantsSharedCollection).toContain(etudiant);
      expect(comp.serviceHospitaliersSharedCollection).toContain(service);
      expect(comp.encadrantsSharedCollection).toContain(encadrant);
      expect(comp.demande).toEqual(demande);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IDemande>>();
      const demande = { id: 123 };
      jest.spyOn(demandeFormService, 'getDemande').mockReturnValue(demande);
      jest.spyOn(demandeService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ demande });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: demande }));
      saveSubject.complete();

      // THEN
      expect(demandeFormService.getDemande).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(demandeService.update).toHaveBeenCalledWith(expect.objectContaining(demande));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IDemande>>();
      const demande = { id: 123 };
      jest.spyOn(demandeFormService, 'getDemande').mockReturnValue({ id: null });
      jest.spyOn(demandeService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ demande: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: demande }));
      saveSubject.complete();

      // THEN
      expect(demandeFormService.getDemande).toHaveBeenCalled();
      expect(demandeService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IDemande>>();
      const demande = { id: 123 };
      jest.spyOn(demandeService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ demande });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(demandeService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });

  describe('Compare relationships', () => {
    describe('compareFormation', () => {
      it('Should forward to formationService', () => {
        const entity = { id: 123 };
        const entity2 = { id: 456 };
        jest.spyOn(formationService, 'compareFormation');
        comp.compareFormation(entity, entity2);
        expect(formationService.compareFormation).toHaveBeenCalledWith(entity, entity2);
      });
    });

    describe('compareEtudiant', () => {
      it('Should forward to etudiantService', () => {
        const entity = { id: 123 };
        const entity2 = { id: 456 };
        jest.spyOn(etudiantService, 'compareEtudiant');
        comp.compareEtudiant(entity, entity2);
        expect(etudiantService.compareEtudiant).toHaveBeenCalledWith(entity, entity2);
      });
    });

    describe('compareServiceHospitalier', () => {
      it('Should forward to serviceHospitalierService', () => {
        const entity = { id: 123 };
        const entity2 = { id: 456 };
        jest.spyOn(serviceHospitalierService, 'compareServiceHospitalier');
        comp.compareServiceHospitalier(entity, entity2);
        expect(serviceHospitalierService.compareServiceHospitalier).toHaveBeenCalledWith(entity, entity2);
      });
    });

    describe('compareEncadrant', () => {
      it('Should forward to encadrantService', () => {
        const entity = { id: 123 };
        const entity2 = { id: 456 };
        jest.spyOn(encadrantService, 'compareEncadrant');
        comp.compareEncadrant(entity, entity2);
        expect(encadrantService.compareEncadrant).toHaveBeenCalledWith(entity, entity2);
      });
    });
  });
});
