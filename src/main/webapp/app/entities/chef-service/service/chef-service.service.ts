import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IChefService, NewChefService } from '../chef-service.model';

export type PartialUpdateChefService = Partial<IChefService> & Pick<IChefService, 'id'>;

export type EntityResponseType = HttpResponse<IChefService>;
export type EntityArrayResponseType = HttpResponse<IChefService[]>;

@Injectable({ providedIn: 'root' })
export class ChefServiceService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/chef-services');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(chefService: NewChefService): Observable<EntityResponseType> {
    return this.http.post<IChefService>(this.resourceUrl, chefService, { observe: 'response' });
  }

  update(chefService: IChefService): Observable<EntityResponseType> {
    return this.http.put<IChefService>(`${this.resourceUrl}/${this.getChefServiceIdentifier(chefService)}`, chefService, {
      observe: 'response',
    });
  }

  partialUpdate(chefService: PartialUpdateChefService): Observable<EntityResponseType> {
    return this.http.patch<IChefService>(`${this.resourceUrl}/${this.getChefServiceIdentifier(chefService)}`, chefService, {
      observe: 'response',
    });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IChefService>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IChefService[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getChefServiceIdentifier(chefService: Pick<IChefService, 'id'>): number {
    return chefService.id;
  }

  compareChefService(o1: Pick<IChefService, 'id'> | null, o2: Pick<IChefService, 'id'> | null): boolean {
    return o1 && o2 ? this.getChefServiceIdentifier(o1) === this.getChefServiceIdentifier(o2) : o1 === o2;
  }

  addChefServiceToCollectionIfMissing<Type extends Pick<IChefService, 'id'>>(
    chefServiceCollection: Type[],
    ...chefServicesToCheck: (Type | null | undefined)[]
  ): Type[] {
    const chefServices: Type[] = chefServicesToCheck.filter(isPresent);
    if (chefServices.length > 0) {
      const chefServiceCollectionIdentifiers = chefServiceCollection.map(
        chefServiceItem => this.getChefServiceIdentifier(chefServiceItem)!
      );
      const chefServicesToAdd = chefServices.filter(chefServiceItem => {
        const chefServiceIdentifier = this.getChefServiceIdentifier(chefServiceItem);
        if (chefServiceCollectionIdentifiers.includes(chefServiceIdentifier)) {
          return false;
        }
        chefServiceCollectionIdentifiers.push(chefServiceIdentifier);
        return true;
      });
      return [...chefServicesToAdd, ...chefServiceCollection];
    }
    return chefServiceCollection;
  }
}
