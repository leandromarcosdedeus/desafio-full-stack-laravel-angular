import { TestBed } from '@angular/core/testing';

import { RegionalsService } from './regionals.service';

describe('RegionalsService', () => {
  let service: RegionalsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RegionalsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
