import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IEncadrant, NewEncadrant } from '../encadrant.model';

export type PartialUpdateEncadrant = Partial<IEncadrant> & Pick<IEncadrant, 'id'>;

export type EntityResponseType = HttpResponse<IEncadrant>;
export type EntityArrayResponseType = HttpResponse<IEncadrant[]>;

@Injectable({ providedIn: 'root' })
export class EncadrantService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/encadrants');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(encadrant: NewEncadrant): Observable<EntityResponseType> {
    return this.http.post<IEncadrant>(this.resourceUrl, encadrant, { observe: 'response' });
  }

  update(encadrant: IEncadrant): Observable<EntityResponseType> {
    return this.http.put<IEncadrant>(`${this.resourceUrl}/${this.getEncadrantIdentifier(encadrant)}`, encadrant, { observe: 'response' });
  }

  partialUpdate(encadrant: PartialUpdateEncadrant): Observable<EntityResponseType> {
    return this.http.patch<IEncadrant>(`${this.resourceUrl}/${this.getEncadrantIdentifier(encadrant)}`, encadrant, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IEncadrant>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IEncadrant[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getEncadrantIdentifier(encadrant: Pick<IEncadrant, 'id'>): number {
    return encadrant.id;
  }

  compareEncadrant(o1: Pick<IEncadrant, 'id'> | null, o2: Pick<IEncadrant, 'id'> | null): boolean {
    return o1 && o2 ? this.getEncadrantIdentifier(o1) === this.getEncadrantIdentifier(o2) : o1 === o2;
  }

  addEncadrantToCollectionIfMissing<Type extends Pick<IEncadrant, 'id'>>(
    encadrantCollection: Type[],
    ...encadrantsToCheck: (Type | null | undefined)[]
  ): Type[] {
    const encadrants: Type[] = encadrantsToCheck.filter(isPresent);
    if (encadrants.length > 0) {
      const encadrantCollectionIdentifiers = encadrantCollection.map(encadrantItem => this.getEncadrantIdentifier(encadrantItem)!);
      const encadrantsToAdd = encadrants.filter(encadrantItem => {
        const encadrantIdentifier = this.getEncadrantIdentifier(encadrantItem);
        if (encadrantCollectionIdentifiers.includes(encadrantIdentifier)) {
          return false;
        }
        encadrantCollectionIdentifiers.push(encadrantIdentifier);
        return true;
      });
      return [...encadrantsToAdd, ...encadrantCollection];
    }
    return encadrantCollection;
  }
}
