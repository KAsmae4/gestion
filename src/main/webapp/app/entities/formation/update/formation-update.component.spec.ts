import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { FormationFormService } from './formation-form.service';
import { FormationService } from '../service/formation.service';
import { IFormation } from '../formation.model';
import { ITypeFormation } from 'app/entities/type-formation/type-formation.model';
import { TypeFormationService } from 'app/entities/type-formation/service/type-formation.service';

import { FormationUpdateComponent } from './formation-update.component';

describe('Formation Management Update Component', () => {
  let comp: FormationUpdateComponent;
  let fixture: ComponentFixture<FormationUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let formationFormService: FormationFormService;
  let formationService: FormationService;
  let typeFormationService: TypeFormationService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [FormationUpdateComponent],
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
      .overrideTemplate(FormationUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(FormationUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    formationFormService = TestBed.inject(FormationFormService);
    formationService = TestBed.inject(FormationService);
    typeFormationService = TestBed.inject(TypeFormationService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call TypeFormation query and add missing value', () => {
      const formation: IFormation = { id: 456 };
      const typeFormation: ITypeFormation = { id: 44276 };
      formation.typeFormation = typeFormation;

      const typeFormationCollection: ITypeFormation[] = [{ id: 56970 }];
      jest.spyOn(typeFormationService, 'query').mockReturnValue(of(new HttpResponse({ body: typeFormationCollection })));
      const additionalTypeFormations = [typeFormation];
      const expectedCollection: ITypeFormation[] = [...additionalTypeFormations, ...typeFormationCollection];
      jest.spyOn(typeFormationService, 'addTypeFormationToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ formation });
      comp.ngOnInit();

      expect(typeFormationService.query).toHaveBeenCalled();
      expect(typeFormationService.addTypeFormationToCollectionIfMissing).toHaveBeenCalledWith(
        typeFormationCollection,
        ...additionalTypeFormations.map(expect.objectContaining)
      );
      expect(comp.typeFormationsSharedCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const formation: IFormation = { id: 456 };
      const typeFormation: ITypeFormation = { id: 467 };
      formation.typeFormation = typeFormation;

      activatedRoute.data = of({ formation });
      comp.ngOnInit();

      expect(comp.typeFormationsSharedCollection).toContain(typeFormation);
      expect(comp.formation).toEqual(formation);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IFormation>>();
      const formation = { id: 123 };
      jest.spyOn(formationFormService, 'getFormation').mockReturnValue(formation);
      jest.spyOn(formationService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ formation });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: formation }));
      saveSubject.complete();

      // THEN
      expect(formationFormService.getFormation).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(formationService.update).toHaveBeenCalledWith(expect.objectContaining(formation));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IFormation>>();
      const formation = { id: 123 };
      jest.spyOn(formationFormService, 'getFormation').mockReturnValue({ id: null });
      jest.spyOn(formationService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ formation: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: formation }));
      saveSubject.complete();

      // THEN
      expect(formationFormService.getFormation).toHaveBeenCalled();
      expect(formationService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IFormation>>();
      const formation = { id: 123 };
      jest.spyOn(formationService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ formation });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(formationService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });

  describe('Compare relationships', () => {
    describe('compareTypeFormation', () => {
      it('Should forward to typeFormationService', () => {
        const entity = { id: 123 };
        const entity2 = { id: 456 };
        jest.spyOn(typeFormationService, 'compareTypeFormation');
        comp.compareTypeFormation(entity, entity2);
        expect(typeFormationService.compareTypeFormation).toHaveBeenCalledWith(entity, entity2);
      });
    });
  });
});
