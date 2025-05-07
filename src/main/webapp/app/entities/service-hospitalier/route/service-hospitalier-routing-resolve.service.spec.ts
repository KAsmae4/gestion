import { TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRouteSnapshot, ActivatedRoute, Router, convertToParamMap } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { IServiceHospitalier } from '../service-hospitalier.model';
import { ServiceHospitalierService } from '../service/service-hospitalier.service';

import { ServiceHospitalierRoutingResolveService } from './service-hospitalier-routing-resolve.service';

describe('ServiceHospitalier routing resolve service', () => {
  let mockRouter: Router;
  let mockActivatedRouteSnapshot: ActivatedRouteSnapshot;
  let routingResolveService: ServiceHospitalierRoutingResolveService;
  let service: ServiceHospitalierService;
  let resultServiceHospitalier: IServiceHospitalier | null | undefined;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: convertToParamMap({}),
            },
          },
        },
      ],
    });
    mockRouter = TestBed.inject(Router);
    jest.spyOn(mockRouter, 'navigate').mockImplementation(() => Promise.resolve(true));
    mockActivatedRouteSnapshot = TestBed.inject(ActivatedRoute).snapshot;
    routingResolveService = TestBed.inject(ServiceHospitalierRoutingResolveService);
    service = TestBed.inject(ServiceHospitalierService);
    resultServiceHospitalier = undefined;
  });

  describe('resolve', () => {
    it('should return IServiceHospitalier returned by find', () => {
      // GIVEN
      service.find = jest.fn(id => of(new HttpResponse({ body: { id } })));
      mockActivatedRouteSnapshot.params = { id: 123 };

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultServiceHospitalier = result;
      });

      // THEN
      expect(service.find).toBeCalledWith(123);
      expect(resultServiceHospitalier).toEqual({ id: 123 });
    });

    it('should return null if id is not provided', () => {
      // GIVEN
      service.find = jest.fn();
      mockActivatedRouteSnapshot.params = {};

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultServiceHospitalier = result;
      });

      // THEN
      expect(service.find).not.toBeCalled();
      expect(resultServiceHospitalier).toEqual(null);
    });

    it('should route to 404 page if data not found in server', () => {
      // GIVEN
      jest.spyOn(service, 'find').mockReturnValue(of(new HttpResponse<IServiceHospitalier>({ body: null })));
      mockActivatedRouteSnapshot.params = { id: 123 };

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultServiceHospitalier = result;
      });

      // THEN
      expect(service.find).toBeCalledWith(123);
      expect(resultServiceHospitalier).toEqual(undefined);
      expect(mockRouter.navigate).toHaveBeenCalledWith(['404']);
    });
  });
});
