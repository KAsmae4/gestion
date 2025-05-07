import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { TypeServiceDetailComponent } from './type-service-detail.component';

describe('TypeService Management Detail Component', () => {
  let comp: TypeServiceDetailComponent;
  let fixture: ComponentFixture<TypeServiceDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TypeServiceDetailComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { data: of({ typeService: { id: 123 } }) },
        },
      ],
    })
      .overrideTemplate(TypeServiceDetailComponent, '')
      .compileComponents();
    fixture = TestBed.createComponent(TypeServiceDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load typeService on init', () => {
      // WHEN
      comp.ngOnInit();

      // THEN
      expect(comp.typeService).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
