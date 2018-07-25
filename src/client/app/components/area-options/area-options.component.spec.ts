import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {AreaOptionsComponent} from './area-options.component';
import {MatListModule} from '@angular/material';
import {FilterUpdateServiceB} from '../../services/filters-2/filter-update.service';
import {ScrollReadyService} from '../../services/observable/scroll-ready.service';


describe('AreaOptionsComponent', () => {
  let component: AreaOptionsComponent;
  let fixture: ComponentFixture<AreaOptionsComponent>;
  let readyService;
  let filterService;
  const filterMock = {areas: [{id: 1, name: ''}], selectedAreas: [{id: 1, name: ''}]};

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AreaOptionsComponent],
      imports: [MatListModule],
      providers: [{
        provide: FilterUpdateServiceB,
        useClass: class {
          updateSelectSingleAreaStore = jasmine.createSpy('updateSelectSingleAreaStore').and.returnValue([{id: 1, name: ''}]);
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
    fixture = TestBed.createComponent(AreaOptionsComponent);
    component = fixture.componentInstance;
    component.filter = filterMock;
    readyService = fixture.debugElement.injector.get(ScrollReadyService);
    filterService = fixture.debugElement.injector.get(FilterUpdateServiceB);
    spyOn(component.areaNavigation, 'emit');
//    fixture.detectChanges();
  });

  it('should create', async () => {
    expect(component).toBeTruthy();
  });

  it('should update store, set scroll position, and emit navigation event', () => {
    component.onAreaListControlChanged(1);
    expect(component.areaNavigation.emit).toHaveBeenCalledWith({selected: [{id: 1, name: ''}]});
    expect(readyService.setPosition).toHaveBeenCalledWith(0);
    expect(filterService.updateSelectSingleAreaStore).toHaveBeenCalledWith(filterMock.areas, 1)

  });
});
