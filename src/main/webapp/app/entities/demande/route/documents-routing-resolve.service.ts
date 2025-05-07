import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRouteSnapshot, Resolve, Router } from '@angular/router';
import { EMPTY, Observable, of } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { IDocuments } from '../../documents/documents.model';
import { DocumentsService } from '../../documents/service/documents.service';

@Injectable({ providedIn: 'root' })
export class DocumentsRoutingResolveService implements Resolve<IDocuments | null> {
  constructor(protected service: DocumentsService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IDocuments | null | never> {
    const id = route.params['id'];
    if (id) {
      return this.service.findByDemande(id).pipe(
        mergeMap((documents: HttpResponse<IDocuments>) => {
          if (documents.body) {
            return of(documents.body);
          } else {
            // this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(null);
  }
}
