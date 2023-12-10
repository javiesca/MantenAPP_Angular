import { TestBed } from '@angular/core/testing';

import { RuedasService } from './ruedas.service';

describe('RuedasService', () => {
  let service: RuedasService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RuedasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
