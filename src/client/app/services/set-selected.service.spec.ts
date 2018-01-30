import { TestBed, inject } from '@angular/core/testing';

import { SetSelectedService } from './set-selected.service';

describe('SetSelectedService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SetSelectedService]
    });
  });

  it('should be created', inject([SetSelectedService], (service: SetSelectedService) => {
    expect(service).toBeTruthy();
  }));
});
