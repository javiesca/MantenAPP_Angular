import { TestBed } from '@angular/core/testing';

import { ITVService } from './itvs.service';

describe('ItvsService', () => {
  let service: ITVService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ITVService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
