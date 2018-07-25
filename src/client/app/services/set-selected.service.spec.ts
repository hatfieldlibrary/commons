import { TestBed, inject } from '@angular/core/testing';

import { SetSelectedService } from './set-selected.service';
import {Store, StoreModule} from '@ngrx/store';

describe('SetSelectedService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({}),
      ],
      providers: [SetSelectedService]
    });
  });

  it('should be created', inject([SetSelectedService], (service: SetSelectedService) => {
    expect(service).toBeTruthy();
  }));
});
