import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IEncadrant } from '../encadrant.model';
import { EncadrantService } from '../service/encadrant.service';

@Injectable({ providedIn: 'root' })
export class EncadrantRoutingResolveService implements Resolve<IEncadrant | null> {
  constructor(protected service: EncadrantService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IEncadrant | null | never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((encadrant: HttpResponse<IEncadrant>) => {
          if (encadrant.body) {
            return of(encadrant.body);
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
