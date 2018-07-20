import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {AreaFiltersComponent} from './area-filters.component';
import {CloseSvgDisabledComponent} from '../svg/close-svg-disabled/close-svg-disabled.component';
import {CloseWhiteSvgComponent} from '../svg/close-white-svg/close-white-svg.component';
import {MatChipsModule, MatIconModule} from '@angular/material';
import {Store} from '@ngrx/store';
import {Observable} from 'rxjs/index';
import {FlexLayoutModule} from '@angular/flex-layout';

describe('AreaFiltersComponent', () => {
  let component: AreaFiltersComponent;
  let fixture: ComponentFixture<AreaFiltersComponent>;

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
          provide: Store,
          useClass: class {
            dispatch = jasmine.createSpy('dispatch');
            select = () => {
              // return Observable.of(areaList);
            };
          }
        },
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AreaFiltersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', async () => {
    expect(component).toBeTruthy();
  });
});
