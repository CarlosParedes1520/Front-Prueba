import { TestBed } from '@angular/core/testing';

import { ConversacionServiceService } from './conversacion-service.service';

describe('ConversacionServiceService', () => {
  let service: ConversacionServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConversacionServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
