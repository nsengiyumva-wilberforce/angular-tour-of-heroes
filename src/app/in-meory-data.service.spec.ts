import { TestBed } from '@angular/core/testing';

import { InMeoryDataService } from './in-meory-data.service';

describe('InMeoryDataService', () => {
  let service: InMeoryDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InMeoryDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
