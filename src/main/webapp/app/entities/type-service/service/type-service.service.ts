import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { ITypeService, NewTypeService } from '../type-service.model';

export type PartialUpdateTypeService = Partial<ITypeService> & Pick<ITypeService, 'id'>;

export type EntityResponseType = HttpResponse<ITypeService>;
export type EntityArrayResponseType = HttpResponse<ITypeService[]>;

@Injectable({ providedIn: 'root' })
export class TypeServiceService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/type-services');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(typeService: NewTypeService): Observable<EntityResponseType> {
    return this.http.post<ITypeService>(this.resourceUrl, typeService, { observe: 'response' });
  }

  update(typeService: ITypeService): Observable<EntityResponseType> {
    return this.http.put<ITypeService>(`${this.resourceUrl}/${this.getTypeServiceIdentifier(typeService)}`, typeService, {
      observe: 'response',
    });
  }

  partialUpdate(typeService: PartialUpdateTypeService): Observable<EntityResponseType> {
    return this.http.patch<ITypeService>(`${this.resourceUrl}/${this.getTypeServiceIdentifier(typeService)}`, typeService, {
      observe: 'response',
    });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<ITypeService>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ITypeService[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getTypeServiceIdentifier(typeService: Pick<ITypeService, 'id'>): number {
    return typeService.id;
  }

  compareTypeService(o1: Pick<ITypeService, 'id'> | null, o2: Pick<ITypeService, 'id'> | null): boolean {
    return o1 && o2 ? this.getTypeServiceIdentifier(o1) === this.getTypeServiceIdentifier(o2) : o1 === o2;
  }

  addTypeServiceToCollectionIfMissing<Type extends Pick<ITypeService, 'id'>>(
    typeServiceCollection: Type[],
    ...typeServicesToCheck: (Type | null | undefined)[]
  ): Type[] {
    const typeServices: Type[] = typeServicesToCheck.filter(isPresent);
    if (typeServices.length > 0) {
      const typeServiceCollectionIdentifiers = typeServiceCollection.map(
        typeServiceItem => this.getTypeServiceIdentifier(typeServiceItem)!
      );
      const typeServicesToAdd = typeServices.filter(typeServiceItem => {
        const typeServiceIdentifier = this.getTypeServiceIdentifier(typeServiceItem);
        if (typeServiceCollectionIdentifiers.includes(typeServiceIdentifier)) {
          return false;
        }
        typeServiceCollectionIdentifiers.push(typeServiceIdentifier);
        return true;
      });
      return [...typeServicesToAdd, ...typeServiceCollection];
    }
    return typeServiceCollection;
  }
}
