import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AreaBannerComponent } from './area-banner.component';
import {AreaFiltersComponent} from '../area-filters/area-filters.component';
import {CloseSvgDisabledComponent} from '../svg/close-svg-disabled/close-svg-disabled.component';
import {CloseSvgComponent} from '../svg/close-svg/close-svg.component';
import {MatChipsModule, MatIconModule} from '@angular/material';
import {CloseWhiteSvgComponent} from '../svg/close-white-svg/close-white-svg.component';
import {FlexLayoutModule} from '@angular/flex-layout';
import {Store, StoreModule} from '@ngrx/store';

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
      providers: []
    });
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AreaBannerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', async () => {
    expect(component).toBeTruthy();
  });
});
