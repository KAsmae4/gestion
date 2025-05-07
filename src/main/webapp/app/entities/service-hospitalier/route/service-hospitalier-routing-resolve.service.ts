import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IServiceHospitalier } from '../service-hospitalier.model';
import { ServiceHospitalierService } from '../service/service-hospitalier.service';

@Injectable({ providedIn: 'root' })
export class ServiceHospitalierRoutingResolveService implements Resolve<IServiceHospitalier | null> {
  constructor(protected service: ServiceHospitalierService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IServiceHospitalier | null | never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((serviceHospitalier: HttpResponse<IServiceHospitalier>) => {
          if (serviceHospitalier.body) {
            return of(serviceHospitalier.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(null);
  }
}
