import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { ITypeService } from '../type-service.model';
import { TypeServiceService } from '../service/type-service.service';

@Injectable({ providedIn: 'root' })
export class TypeServiceRoutingResolveService implements Resolve<ITypeService | null> {
  constructor(protected service: TypeServiceService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ITypeService | null | never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((typeService: HttpResponse<ITypeService>) => {
          if (typeService.body) {
            return of(typeService.body);
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
