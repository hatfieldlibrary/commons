import {async, ComponentFixture, fakeAsync, TestBed} from '@angular/core/testing';

import {AreaFiltersComponent} from './area-filters.component';
import {CloseSvgDisabledComponent} from '../svg/close-svg-disabled/close-svg-disabled.component';
import {CloseWhiteSvgComponent} from '../svg/close-white-svg/close-white-svg.component';
import {MatChipsModule, MatIconModule} from '@angular/material';
import {Store} from '@ngrx/store';
import {Observable, Subscription} from 'rxjs/index';
import {FlexLayoutModule, ObservableMedia} from '@angular/flex-layout';

describe('AreaFiltersComponent', () => {
  let component: AreaFiltersComponent;
  let fixture: ComponentFixture<AreaFiltersComponent>;
  let watcher: Subscription;
  const areaListMock = [
    {
      id: 1,
      name: 'areas one'
    }
  ];

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AreaFiltersComponent,
        CloseSvgDisabledComponent,
        CloseWhiteSvgComponent],
      imports: [
        MatChipsModule,
        MatIconModule,
        // needed to test ObservableMedia
        FlexLayoutModule
      ],
      providers: [
        {
          provide: ObservableMedia,
          useValue: {
            asObservable: () => {
              return new Observable<any>();
            },
            subscribe: () => {
              // jasmine.createSpy('subscribe').and.returnValue(new Subscription());
              return new Subscription();
            },
            isActive: () => {
            }
          }
        },
        {
          provide: Store,
          useClass: class {
            dispatch = jasmine.createSpy('dispatch');
            select = () => {
              return Observable.of(areaListMock);
            };
          }
        },
      ]
    });
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AreaFiltersComponent);
    component = fixture.componentInstance;
    component.groups = {
      groups: [{id: 1, name: 'g1'}, {id: 2, name: 'g2'}],
      selectedGroups: [{id: 1, name: 'g1'}],
      previousGroups: [{id: 1, name: 'g1'}, {id: 2, name: 'g2'}]
    };
    component.types = {
      types: [{id: 1, name: 't1'}, {id: 2, name: 't2'}],
      selectedTypes: [{id: 1, name: 't1'}],
      previousTypes: [{id: 1, name: 't1'}, {id: 2, name: 't2'}]
    };
    component.subjects = {
      subjects: [{id: 1, name: 'ts'}, {id: 2, name: 't2'}],
      selectedSubjects: [{id: 1, name: 's1'}],
      previousSubjects: [{id: 1, name: 's1'}, {id: 2, name: 's2'}]
    };
    component.filters = {
      filterTerm: '',
      selectedSubjects: [{
        id: 0,
        name: ''
      }],
      selectedTypes: [{
        id: 0,
        name: ''
      }],
      selectedAreas: [{
        id: 0,
        name: ''
      }],
      selectedGroups: [{
        id: 0,
        name: ''
      }],
      previousAreas: [{
        id: 0,
        name: ''
      }],
      previousSubjects: [{
        id: 0,
        name: ''
      }],
      removedTypes: [{
        id: 0,
        name: ''
      }],
      previousGroups: [{
        id: 0,
        name: ''
      }]
    };
    watcher = component.watcher;
    spyOn(watcher, 'unsubscribe');
    // fixture.detectChanges();
  });

  it('should create', async () => {
    expect(component).toBeTruthy();
  });

  it('should unsubscribe with component tear down', fakeAsync(() => {
    component.ngOnDestroy();
    expect(watcher.unsubscribe).toHaveBeenCalled();

  }));

});
