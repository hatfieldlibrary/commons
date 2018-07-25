import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterSvgComponent } from './filter-svg.component';
import {MatIconModule, MatIconRegistry} from '@angular/material';
import {DomSanitizer} from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';

describe('FilterSvgComponent', () => {
  let component: FilterSvgComponent;
  let fixture: ComponentFixture<FilterSvgComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FilterSvgComponent ],
      imports: [MatIconModule, HttpClientModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    const iconRegistry = TestBed.get(MatIconRegistry);
    const sanitizer = TestBed.get(DomSanitizer);
    iconRegistry.addSvgIcon('filter-icon', sanitizer.bypassSecurityTrustResourceUrl('../../assets/img/svg/ic_filter_list_black_24px.svg'));
    fixture = TestBed.createComponent(FilterSvgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
