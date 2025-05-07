import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { EncadrantDetailComponent } from './encadrant-detail.component';

describe('Encadrant Management Detail Component', () => {
  let comp: EncadrantDetailComponent;
  let fixture: ComponentFixture<EncadrantDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EncadrantDetailComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { data: of({ encadrant: { id: 123 } }) },
        },
      ],
    })
      .overrideTemplate(EncadrantDetailComponent, '')
      .compileComponents();
    fixture = TestBed.createComponent(EncadrantDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load encadrant on init', () => {
      // WHEN
      comp.ngOnInit();

      // THEN
      expect(comp.encadrant).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
