import { TestBed } from '@angular/core/testing';

import { PiezasService } from './piezas.service';

describe('PiezasService', () => {
  let service: PiezasService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PiezasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
