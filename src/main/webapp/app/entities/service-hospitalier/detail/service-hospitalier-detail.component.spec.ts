import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { ServiceHospitalierDetailComponent } from './service-hospitalier-detail.component';

describe('ServiceHospitalier Management Detail Component', () => {
  let comp: ServiceHospitalierDetailComponent;
  let fixture: ComponentFixture<ServiceHospitalierDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ServiceHospitalierDetailComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { data: of({ serviceHospitalier: { id: 123 } }) },
        },
      ],
    })
      .overrideTemplate(ServiceHospitalierDetailComponent, '')
      .compileComponents();
    fixture = TestBed.createComponent(ServiceHospitalierDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load serviceHospitalier on init', () => {
      // WHEN
      comp.ngOnInit();

      // THEN
      expect(comp.serviceHospitalier).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
