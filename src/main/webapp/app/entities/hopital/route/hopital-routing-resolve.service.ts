import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IHopital } from '../hopital.model';
import { HopitalService } from '../service/hopital.service';

@Injectable({ providedIn: 'root' })
export class HopitalRoutingResolveService implements Resolve<IHopital | null> {
  constructor(protected service: HopitalService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IHopital | null | never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((hopital: HttpResponse<IHopital>) => {
          if (hopital.body) {
            return of(hopital.body);
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
