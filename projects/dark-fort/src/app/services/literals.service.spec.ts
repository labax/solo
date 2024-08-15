import { TestBed } from '@angular/core/testing';

import { LiteralsService } from './literals.service';

describe('LiteralsService', () => {
  let service: LiteralsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LiteralsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
