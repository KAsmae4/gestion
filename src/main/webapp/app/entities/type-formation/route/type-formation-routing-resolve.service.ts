import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { ITypeFormation } from '../type-formation.model';
import { TypeFormationService } from '../service/type-formation.service';

@Injectable({ providedIn: 'root' })
export class TypeFormationRoutingResolveService implements Resolve<ITypeFormation | null> {
  constructor(protected service: TypeFormationService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ITypeFormation | null | never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((typeFormation: HttpResponse<ITypeFormation>) => {
          if (typeFormation.body) {
            return of(typeFormation.body);
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
