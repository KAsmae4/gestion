import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { ChefServiceFormService } from './chef-service-form.service';
import { ChefServiceService } from '../service/chef-service.service';
import { IChefService } from '../chef-service.model';

import { ChefServiceUpdateComponent } from './chef-service-update.component';

describe('ChefService Management Update Component', () => {
  let comp: ChefServiceUpdateComponent;
  let fixture: ComponentFixture<ChefServiceUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let chefServiceFormService: ChefServiceFormService;
  let chefServiceService: ChefServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [ChefServiceUpdateComponent],
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
      .overrideTemplate(ChefServiceUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(ChefServiceUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    chefServiceFormService = TestBed.inject(ChefServiceFormService);
    chefServiceService = TestBed.inject(ChefServiceService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should update editForm', () => {
      const chefService: IChefService = { id: 456 };

      activatedRoute.data = of({ chefService });
      comp.ngOnInit();

      expect(comp.chefService).toEqual(chefService);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IChefService>>();
      const chefService = { id: 123 };
      jest.spyOn(chefServiceFormService, 'getChefService').mockReturnValue(chefService);
      jest.spyOn(chefServiceService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ chefService });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: chefService }));
      saveSubject.complete();

      // THEN
      expect(chefServiceFormService.getChefService).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(chefServiceService.update).toHaveBeenCalledWith(expect.objectContaining(chefService));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IChefService>>();
      const chefService = { id: 123 };
      jest.spyOn(chefServiceFormService, 'getChefService').mockReturnValue({ id: null });
      jest.spyOn(chefServiceService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ chefService: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: chefService }));
      saveSubject.complete();

      // THEN
      expect(chefServiceFormService.getChefService).toHaveBeenCalled();
      expect(chefServiceService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IChefService>>();
      const chefService = { id: 123 };
      jest.spyOn(chefServiceService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ chefService });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(chefServiceService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });
});
