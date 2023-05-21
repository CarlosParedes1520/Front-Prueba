import { TestBed } from '@angular/core/testing';

import { DetalleServiceService } from './detalle-service.service';

describe('DetalleServiceService', () => {
  let service: DetalleServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DetalleServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
