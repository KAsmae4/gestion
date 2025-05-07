import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { IChefService } from '../chef-service.model';
import { sampleWithRequiredData, sampleWithNewData, sampleWithPartialData, sampleWithFullData } from '../chef-service.test-samples';

import { ChefServiceService } from './chef-service.service';

const requireRestSample: IChefService = {
  ...sampleWithRequiredData,
};

describe('ChefService Service', () => {
  let service: ChefServiceService;
  let httpMock: HttpTestingController;
  let expectedResult: IChefService | IChefService[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(ChefServiceService);
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

    it('should create a ChefService', () => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const chefService = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(chefService).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a ChefService', () => {
      const chefService = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(chefService).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a ChefService', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of ChefService', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a ChefService', () => {
      const expected = true;

      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addChefServiceToCollectionIfMissing', () => {
      it('should add a ChefService to an empty array', () => {
        const chefService: IChefService = sampleWithRequiredData;
        expectedResult = service.addChefServiceToCollectionIfMissing([], chefService);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(chefService);
      });

      it('should not add a ChefService to an array that contains it', () => {
        const chefService: IChefService = sampleWithRequiredData;
        const chefServiceCollection: IChefService[] = [
          {
            ...chefService,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addChefServiceToCollectionIfMissing(chefServiceCollection, chefService);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a ChefService to an array that doesn't contain it", () => {
        const chefService: IChefService = sampleWithRequiredData;
        const chefServiceCollection: IChefService[] = [sampleWithPartialData];
        expectedResult = service.addChefServiceToCollectionIfMissing(chefServiceCollection, chefService);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(chefService);
      });

      it('should add only unique ChefService to an array', () => {
        const chefServiceArray: IChefService[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const chefServiceCollection: IChefService[] = [sampleWithRequiredData];
        expectedResult = service.addChefServiceToCollectionIfMissing(chefServiceCollection, ...chefServiceArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const chefService: IChefService = sampleWithRequiredData;
        const chefService2: IChefService = sampleWithPartialData;
        expectedResult = service.addChefServiceToCollectionIfMissing([], chefService, chefService2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(chefService);
        expect(expectedResult).toContain(chefService2);
      });

      it('should accept null and undefined values', () => {
        const chefService: IChefService = sampleWithRequiredData;
        expectedResult = service.addChefServiceToCollectionIfMissing([], null, chefService, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(chefService);
      });

      it('should return initial array if no ChefService is added', () => {
        const chefServiceCollection: IChefService[] = [sampleWithRequiredData];
        expectedResult = service.addChefServiceToCollectionIfMissing(chefServiceCollection, undefined, null);
        expect(expectedResult).toEqual(chefServiceCollection);
      });
    });

    describe('compareChefService', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareChefService(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 123 };
        const entity2 = null;

        const compareResult1 = service.compareChefService(entity1, entity2);
        const compareResult2 = service.compareChefService(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 456 };

        const compareResult1 = service.compareChefService(entity1, entity2);
        const compareResult2 = service.compareChefService(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 123 };

        const compareResult1 = service.compareChefService(entity1, entity2);
        const compareResult2 = service.compareChefService(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
