import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { TypeServiceFormService } from './type-service-form.service';
import { TypeServiceService } from '../service/type-service.service';
import { ITypeService } from '../type-service.model';

import { TypeServiceUpdateComponent } from './type-service-update.component';

describe('TypeService Management Update Component', () => {
  let comp: TypeServiceUpdateComponent;
  let fixture: ComponentFixture<TypeServiceUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let typeServiceFormService: TypeServiceFormService;
  let typeServiceService: TypeServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [TypeServiceUpdateComponent],
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
      .overrideTemplate(TypeServiceUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(TypeServiceUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    typeServiceFormService = TestBed.inject(TypeServiceFormService);
    typeServiceService = TestBed.inject(TypeServiceService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should update editForm', () => {
      const typeService: ITypeService = { id: 456 };

      activatedRoute.data = of({ typeService });
      comp.ngOnInit();

      expect(comp.typeService).toEqual(typeService);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ITypeService>>();
      const typeService = { id: 123 };
      jest.spyOn(typeServiceFormService, 'getTypeService').mockReturnValue(typeService);
      jest.spyOn(typeServiceService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ typeService });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: typeService }));
      saveSubject.complete();

      // THEN
      expect(typeServiceFormService.getTypeService).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(typeServiceService.update).toHaveBeenCalledWith(expect.objectContaining(typeService));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ITypeService>>();
      const typeService = { id: 123 };
      jest.spyOn(typeServiceFormService, 'getTypeService').mockReturnValue({ id: null });
      jest.spyOn(typeServiceService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ typeService: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: typeService }));
      saveSubject.complete();

      // THEN
      expect(typeServiceFormService.getTypeService).toHaveBeenCalled();
      expect(typeServiceService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ITypeService>>();
      const typeService = { id: 123 };
      jest.spyOn(typeServiceService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ typeService });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(typeServiceService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });
});
