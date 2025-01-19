import { TestBed } from '@angular/core/testing';

import { ItvsService } from './itvs.service';

describe('ItvsService', () => {
  let service: ItvsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ItvsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
