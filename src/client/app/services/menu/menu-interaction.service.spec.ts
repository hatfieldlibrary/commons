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

  it('should call open menu subject next', inject([MenuInteractionService], (service: MenuInteractionService) => {
    expect(service).toBeTruthy();
    spyOn(service.menuOpenSource, 'next');
    service.openMenu();
    expect(service.menuOpenSource.next).toHaveBeenCalled();
  }));

  it('should call close menu subject next', inject([MenuInteractionService], (service: MenuInteractionService) => {
    expect(service).toBeTruthy();
    spyOn(service.menuCloseSource, 'next');
    service.closeMenu();
    expect(service.menuCloseSource.next).toHaveBeenCalled();
  }));


});
