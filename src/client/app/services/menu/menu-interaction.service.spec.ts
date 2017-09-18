import { TestBed, inject } from '@angular/core/testing';

import { MenuInteractionService } from './menu-interaction.service';

describe('MenuInteractionService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MenuInteractionService]
    });
  });

  it('should be created', inject([MenuInteractionService], (service: MenuInteractionService) => {
    expect(service).toBeTruthy();
  }));
});
