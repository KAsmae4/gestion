import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { HopitalDetailComponent } from './hopital-detail.component';

describe('Hopital Management Detail Component', () => {
  let comp: HopitalDetailComponent;
  let fixture: ComponentFixture<HopitalDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HopitalDetailComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { data: of({ hopital: { id: 123 } }) },
        },
      ],
    })
      .overrideTemplate(HopitalDetailComponent, '')
      .compileComponents();
    fixture = TestBed.createComponent(HopitalDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load hopital on init', () => {
      // WHEN
      comp.ngOnInit();

      // THEN
      expect(comp.hopital).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
