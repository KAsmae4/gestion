import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { IServiceHospitalier } from '../service-hospitalier.model';
import { sampleWithRequiredData, sampleWithNewData, sampleWithPartialData, sampleWithFullData } from '../service-hospitalier.test-samples';

import { ServiceHospitalierService } from './service-hospitalier.service';

const requireRestSample: IServiceHospitalier = {
  ...sampleWithRequiredData,
};

describe('ServiceHospitalier Service', () => {
  let service: ServiceHospitalierService;
  let httpMock: HttpTestingController;
  let expectedResult: IServiceHospitalier | IServiceHospitalier[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(ServiceHospitalierService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  describe('Service methods', () => {
    it('should find an element', () => {
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.find(123).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should create a ServiceHospitalier', () => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const serviceHospitalier = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(serviceHospitalier).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a ServiceHospitalier', () => {
      const serviceHospitalier = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(serviceHospitalier).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a ServiceHospitalier', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of ServiceHospitalier', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a ServiceHospitalier', () => {
      const expected = true;

      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addServiceHospitalierToCollectionIfMissing', () => {
      it('should add a ServiceHospitalier to an empty array', () => {
        const serviceHospitalier: IServiceHospitalier = sampleWithRequiredData;
        expectedResult = service.addServiceHospitalierToCollectionIfMissing([], serviceHospitalier);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(serviceHospitalier);
      });

      it('should not add a ServiceHospitalier to an array that contains it', () => {
        const serviceHospitalier: IServiceHospitalier = sampleWithRequiredData;
        const serviceHospitalierCollection: IServiceHospitalier[] = [
          {
            ...serviceHospitalier,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addServiceHospitalierToCollectionIfMissing(serviceHospitalierCollection, serviceHospitalier);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a ServiceHospitalier to an array that doesn't contain it", () => {
        const serviceHospitalier: IServiceHospitalier = sampleWithRequiredData;
        const serviceHospitalierCollection: IServiceHospitalier[] = [sampleWithPartialData];
        expectedResult = service.addServiceHospitalierToCollectionIfMissing(serviceHospitalierCollection, serviceHospitalier);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(serviceHospitalier);
      });

      it('should add only unique ServiceHospitalier to an array', () => {
        const serviceHospitalierArray: IServiceHospitalier[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const serviceHospitalierCollection: IServiceHospitalier[] = [sampleWithRequiredData];
        expectedResult = service.addServiceHospitalierToCollectionIfMissing(serviceHospitalierCollection, ...serviceHospitalierArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const serviceHospitalier: IServiceHospitalier = sampleWithRequiredData;
        const serviceHospitalier2: IServiceHospitalier = sampleWithPartialData;
        expectedResult = service.addServiceHospitalierToCollectionIfMissing([], serviceHospitalier, serviceHospitalier2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(serviceHospitalier);
        expect(expectedResult).toContain(serviceHospitalier2);
      });

      it('should accept null and undefined values', () => {
        const serviceHospitalier: IServiceHospitalier = sampleWithRequiredData;
        expectedResult = service.addServiceHospitalierToCollectionIfMissing([], null, serviceHospitalier, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(serviceHospitalier);
      });

      it('should return initial array if no ServiceHospitalier is added', () => {
        const serviceHospitalierCollection: IServiceHospitalier[] = [sampleWithRequiredData];
        expectedResult = service.addServiceHospitalierToCollectionIfMissing(serviceHospitalierCollection, undefined, null);
        expect(expectedResult).toEqual(serviceHospitalierCollection);
      });
    });

    describe('compareServiceHospitalier', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareServiceHospitalier(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 123 };
        const entity2 = null;

        const compareResult1 = service.compareServiceHospitalier(entity1, entity2);
        const compareResult2 = service.compareServiceHospitalier(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 456 };

        const compareResult1 = service.compareServiceHospitalier(entity1, entity2);
        const compareResult2 = service.compareServiceHospitalier(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 123 };

        const compareResult1 = service.compareServiceHospitalier(entity1, entity2);
        const compareResult2 = service.compareServiceHospitalier(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
