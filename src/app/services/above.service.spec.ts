import { TestBed, inject } from '@angular/core/testing';

import { AboveService } from './above.service';

describe('AboveService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AboveService]
    });
  });

  it('should be created', inject([AboveService], (service: AboveService) => {
    expect(service).toBeTruthy();
  }));
});
