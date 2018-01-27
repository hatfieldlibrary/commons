import { TestBed, inject } from '@angular/core/testing';

import { UtilitiesService } from './utilities.service';

describe('UtilitiesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UtilitiesService]
    });
  });

  it('should be created', inject([UtilitiesService], (service: UtilitiesService) => {
    expect(service).toBeTruthy();
  }));

  // it('should return link back to list component showing collections for selected for areas and subject',inject([UtilitiesService], (service: UtilitiesService) => {
  //   let backLink = service.getBackLink('1',{id: 1, name: 'test', url: ''});
  //   expect(backLink).toEqual('/commons/collection/subject/1/areas/1');
  // }));
  //
  // it('should return link back to list component showing collections for selected areas',inject([UtilitiesService], (service: UtilitiesService) => {
  //   let backLink = service.getBackLink('1',{id: 0, name: 'test', url: ''});
  //   expect(backLink).toEqual('/commons/collection/areas/1');
  // }));
  //
  // it('should return link back to list component showing collections for selected subject',inject([UtilitiesService], (service: UtilitiesService) => {
  //   let backLink = service.getBackLink('0',{id: 1, name: 'test', url: ''});
  //   expect(backLink).toEqual('/commons/collection/subject/1');
  // }));
  //
  // it('should return link back to list component showing all collections',inject([UtilitiesService], (service: UtilitiesService) => {
  //   let backLink = service.getBackLink('0',{id: 0, name: 'test', url: ''});
  //   expect(backLink).toEqual('/commons/collection');
  // }));

});
