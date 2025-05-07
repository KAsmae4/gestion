import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IServiceHospitalier, NewServiceHospitalier } from '../service-hospitalier.model';

export type PartialUpdateServiceHospitalier = Partial<IServiceHospitalier> & Pick<IServiceHospitalier, 'id'>;

export type EntityResponseType = HttpResponse<IServiceHospitalier>;
export type EntityArrayResponseType = HttpResponse<IServiceHospitalier[]>;

@Injectable({ providedIn: 'root' })
export class ServiceHospitalierService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/service-hospitaliers');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(serviceHospitalier: NewServiceHospitalier): Observable<EntityResponseType> {
    return this.http.post<IServiceHospitalier>(this.resourceUrl, serviceHospitalier, { observe: 'response' });
  }

  update(serviceHospitalier: IServiceHospitalier): Observable<EntityResponseType> {
    return this.http.put<IServiceHospitalier>(
      `${this.resourceUrl}/${this.getServiceHospitalierIdentifier(serviceHospitalier)}`,
      serviceHospitalier,
      { observe: 'response' }
    );
  }

  partialUpdate(serviceHospitalier: PartialUpdateServiceHospitalier): Observable<EntityResponseType> {
    return this.http.patch<IServiceHospitalier>(
      `${this.resourceUrl}/${this.getServiceHospitalierIdentifier(serviceHospitalier)}`,
      serviceHospitalier,
      { observe: 'response' }
    );
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IServiceHospitalier>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IServiceHospitalier[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getServiceHospitalierIdentifier(serviceHospitalier: Pick<IServiceHospitalier, 'id'>): number {
    return serviceHospitalier.id;
  }

  compareServiceHospitalier(o1: Pick<IServiceHospitalier, 'id'> | null, o2: Pick<IServiceHospitalier, 'id'> | null): boolean {
    return o1 && o2 ? this.getServiceHospitalierIdentifier(o1) === this.getServiceHospitalierIdentifier(o2) : o1 === o2;
  }

  addServiceHospitalierToCollectionIfMissing<Type extends Pick<IServiceHospitalier, 'id'>>(
    serviceHospitalierCollection: Type[],
    ...serviceHospitaliersToCheck: (Type | null | undefined)[]
  ): Type[] {
    const serviceHospitaliers: Type[] = serviceHospitaliersToCheck.filter(isPresent);
    if (serviceHospitaliers.length > 0) {
      const serviceHospitalierCollectionIdentifiers = serviceHospitalierCollection.map(
        serviceHospitalierItem => this.getServiceHospitalierIdentifier(serviceHospitalierItem)!
      );
      const serviceHospitaliersToAdd = serviceHospitaliers.filter(serviceHospitalierItem => {
        const serviceHospitalierIdentifier = this.getServiceHospitalierIdentifier(serviceHospitalierItem);
        if (serviceHospitalierCollectionIdentifiers.includes(serviceHospitalierIdentifier)) {
          return false;
        }
        serviceHospitalierCollectionIdentifiers.push(serviceHospitalierIdentifier);
        return true;
      });
      return [...serviceHospitaliersToAdd, ...serviceHospitalierCollection];
    }
    return serviceHospitalierCollection;
  }
}
