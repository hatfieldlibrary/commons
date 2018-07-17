import { TestBed, inject } from '@angular/core/testing';

import { ScrollReadyService } from './scroll-ready.service';

describe('ScrollReadyService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ScrollReadyService]
    });
  });

  it('should be created', inject([ScrollReadyService], (service: ScrollReadyService) => {
    expect(service).toBeTruthy();
  }));
});
