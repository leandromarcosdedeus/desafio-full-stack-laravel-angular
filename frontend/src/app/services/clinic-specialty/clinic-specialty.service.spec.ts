import { TestBed } from '@angular/core/testing';

import { ClinicSpecialtyService } from './clinic-specialty.service';

describe('ClinicSpecialtyService', () => {
  let service: ClinicSpecialtyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ClinicSpecialtyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
