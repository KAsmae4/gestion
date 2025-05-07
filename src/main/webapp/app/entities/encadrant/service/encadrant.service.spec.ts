import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { IEncadrant } from '../encadrant.model';
import { sampleWithRequiredData, sampleWithNewData, sampleWithPartialData, sampleWithFullData } from '../encadrant.test-samples';

import { EncadrantService } from './encadrant.service';

const requireRestSample: IEncadrant = {
  ...sampleWithRequiredData,
};

describe('Encadrant Service', () => {
  let service: EncadrantService;
  let httpMock: HttpTestingController;
  let expectedResult: IEncadrant | IEncadrant[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(EncadrantService);
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

    it('should create a Encadrant', () => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const encadrant = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(encadrant).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a Encadrant', () => {
      const encadrant = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(encadrant).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a Encadrant', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of Encadrant', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a Encadrant', () => {
      const expected = true;

      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addEncadrantToCollectionIfMissing', () => {
      it('should add a Encadrant to an empty array', () => {
        const encadrant: IEncadrant = sampleWithRequiredData;
        expectedResult = service.addEncadrantToCollectionIfMissing([], encadrant);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(encadrant);
      });

      it('should not add a Encadrant to an array that contains it', () => {
        const encadrant: IEncadrant = sampleWithRequiredData;
        const encadrantCollection: IEncadrant[] = [
          {
            ...encadrant,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addEncadrantToCollectionIfMissing(encadrantCollection, encadrant);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a Encadrant to an array that doesn't contain it", () => {
        const encadrant: IEncadrant = sampleWithRequiredData;
        const encadrantCollection: IEncadrant[] = [sampleWithPartialData];
        expectedResult = service.addEncadrantToCollectionIfMissing(encadrantCollection, encadrant);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(encadrant);
      });

      it('should add only unique Encadrant to an array', () => {
        const encadrantArray: IEncadrant[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const encadrantCollection: IEncadrant[] = [sampleWithRequiredData];
        expectedResult = service.addEncadrantToCollectionIfMissing(encadrantCollection, ...encadrantArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const encadrant: IEncadrant = sampleWithRequiredData;
        const encadrant2: IEncadrant = sampleWithPartialData;
        expectedResult = service.addEncadrantToCollectionIfMissing([], encadrant, encadrant2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(encadrant);
        expect(expectedResult).toContain(encadrant2);
      });

      it('should accept null and undefined values', () => {
        const encadrant: IEncadrant = sampleWithRequiredData;
        expectedResult = service.addEncadrantToCollectionIfMissing([], null, encadrant, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(encadrant);
      });

      it('should return initial array if no Encadrant is added', () => {
        const encadrantCollection: IEncadrant[] = [sampleWithRequiredData];
        expectedResult = service.addEncadrantToCollectionIfMissing(encadrantCollection, undefined, null);
        expect(expectedResult).toEqual(encadrantCollection);
      });
    });

    describe('compareEncadrant', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareEncadrant(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 123 };
        const entity2 = null;

        const compareResult1 = service.compareEncadrant(entity1, entity2);
        const compareResult2 = service.compareEncadrant(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 456 };

        const compareResult1 = service.compareEncadrant(entity1, entity2);
        const compareResult2 = service.compareEncadrant(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 123 };

        const compareResult1 = service.compareEncadrant(entity1, entity2);
        const compareResult2 = service.compareEncadrant(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
