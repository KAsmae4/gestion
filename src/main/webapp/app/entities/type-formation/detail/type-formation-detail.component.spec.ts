import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { TypeFormationDetailComponent } from './type-formation-detail.component';

describe('TypeFormation Management Detail Component', () => {
  let comp: TypeFormationDetailComponent;
  let fixture: ComponentFixture<TypeFormationDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TypeFormationDetailComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { data: of({ typeFormation: { id: 123 } }) },
        },
      ],
    })
      .overrideTemplate(TypeFormationDetailComponent, '')
      .compileComponents();
    fixture = TestBed.createComponent(TypeFormationDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load typeFormation on init', () => {
      // WHEN
      comp.ngOnInit();

      // THEN
      expect(comp.typeFormation).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
