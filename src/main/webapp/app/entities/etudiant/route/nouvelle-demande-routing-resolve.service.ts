import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRouteSnapshot, Resolve, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { DemandeService } from '../../demande/service/demande.service';
import { IDemande } from '../../demande/demande.model';

@Injectable({ providedIn: 'root' })
export class NouvelleDemandeRoutingResolveService implements Resolve<IDemande[] | null> {
  constructor(protected service: DemandeService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IDemande[] | null | never> {
    return this.service.findAllNouvelle().pipe(
      mergeMap((demande: HttpResponse<IDemande[]>) => {
        if (demande.body) {
          return of(demande.body);
        } else {
          return [];
        }
      })
    );
  }
}
