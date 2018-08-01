import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TypesComponent } from './types.component';
import {MatListModule} from '@angular/material';
import {FieldTypeKey, FilterUpdateServiceB} from '../../services/filters-2/filter-update.service';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ScrollReadyService} from '../../services/observable/scroll-ready.service';


describe('TypesComponent', () => {
  let component: TypesComponent;
  let fixture: ComponentFixture<TypesComponent>;
  let readyService;
  let filterService;

  const mockTypesFilter = {
    types: [{id: 1, name: 't1'}, {id: 2, name: 't2'}],
    selectedTypes: [{id: 1, name: 't1'}]
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TypesComponent],
      imports: [MatListModule, BrowserAnimationsModule],
      providers: [{
        provide: FilterUpdateServiceB,
        useClass: class {
          updateSelectedFields = jasmine.createSpy('updateSelectedFields').and.returnValue([{id: 1, name: ''}]);
        }
      },
        {
          provide: ScrollReadyService,
          useClass: class {
            setPosition = jasmine.createSpy('setPosition');
          }
        }]
    });
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TypesComponent);
    component = fixture.componentInstance;
    component.filter = mockTypesFilter;
    readyService = fixture.debugElement.injector.get(ScrollReadyService);
    filterService = fixture.debugElement.injector.get(FilterUpdateServiceB);
    spyOn(component.typeNavigation, 'emit');
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should update store, set scroll position, and emit navigation event', () => {
    component.onTypeListControlChanged(1);
    expect(component.typeNavigation.emit).toHaveBeenCalledWith({selected: [{id: 1, name: ''}]});
    expect(readyService.setPosition).toHaveBeenCalledWith(0);
    expect(filterService.updateSelectedFields)
      .toHaveBeenCalledWith(mockTypesFilter.selectedTypes, mockTypesFilter.types,  1, FieldTypeKey.TYPE);
  });

  it('should return true for selected field', () => {
    const selected = component.isSelected(1);
    expect(selected).toBeTruthy();
  });

  it('should return false for selected field', () => {
    const selected = component.isSelected(3);
    expect(selected).toBeFalsy();
  });

});
