import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {AreaBannerComponent} from './area-banner.component';
import {AreaFiltersComponent} from '../area-filters/area-filters.component';
import {CloseSvgDisabledComponent} from '../svg/close-svg-disabled/close-svg-disabled.component';
import {CloseSvgComponent} from '../svg/close-svg/close-svg.component';
import {MatChipsModule, MatIconModule} from '@angular/material';
import {CloseWhiteSvgComponent} from '../svg/close-white-svg/close-white-svg.component';
import {FlexLayoutModule, ObservableMedia} from '@angular/flex-layout';
import {Store, StoreModule} from '@ngrx/store';
import {Observable, Subscription} from 'rxjs/index';

describe('AreaBannerComponent', () => {
  let component: AreaBannerComponent;
  let fixture: ComponentFixture<AreaBannerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AreaBannerComponent,
        AreaFiltersComponent,
        CloseSvgDisabledComponent,
        CloseSvgComponent,
        CloseWhiteSvgComponent],
      imports: [
        MatChipsModule,
        MatIconModule,
        StoreModule.forRoot({}),
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
            isActive: () => {
            },
            subscribe: () =>  { return new Subscription(); }
          }
        }
      ]
    }).overrideComponent(AreaFiltersComponent, {
      set: {
        selector: 'app-area-filters',
        template: `<h6>Area Filters</h6>`
      }
    });
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AreaBannerComponent);
    component = fixture.componentInstance;
    component.areas = {
      areas: [{id: 1, name: 'a1'}, {id: 2, name: 'a2'}],
      selectedAreas: [{id: 1, name: 'a1'}]
    };
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
      previousTypes: [{
        id: 0,
        name: ''
      }],
      previousGroups: [{
        id: 0,
        name: ''
      }]
    };
    fixture.detectChanges();
  });

  it('should create', async () => {
    expect(component).toBeTruthy();
  });
});
