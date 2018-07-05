import { TestBed, inject } from '@angular/core/testing';

import { NavigationServiceB } from './navigation.service';

describe('NavigationService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NavigationServiceB]
    });
  });

  it('should be created', inject([NavigationServiceB], (service: NavigationServiceB) => {
    expect(service).toBeTruthy();
  }));
});
