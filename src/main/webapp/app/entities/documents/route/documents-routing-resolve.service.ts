import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IDocuments } from '../documents.model';
import { DocumentsService } from '../service/documents.service';

@Injectable({ providedIn: 'root' })
export class DocumentsRoutingResolveService implements Resolve<IDocuments | null> {
  constructor(protected service: DocumentsService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IDocuments | null | never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((documents: HttpResponse<IDocuments>) => {
          if (documents.body) {
            return of(documents.body);
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
