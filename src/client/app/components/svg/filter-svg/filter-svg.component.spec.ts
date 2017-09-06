import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterSvgComponent } from './filter-svg.component';
import {MdIconModule, MdIconRegistry} from "@angular/material";
import {DomSanitizer} from "@angular/platform-browser";

describe('FilterSvgComponent', () => {
  let component: FilterSvgComponent;
  let fixture: ComponentFixture<FilterSvgComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FilterSvgComponent ],
      imports: [MdIconModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    let iconRegistry = TestBed.get(MdIconRegistry);
    let sanitizer = TestBed.get(DomSanitizer);
    iconRegistry.addSvgIcon('filter-icon', sanitizer.bypassSecurityTrustResourceUrl('../../assets/img/svg/ic_filter_list_black_24px.svg'));
    fixture = TestBed.createComponent(FilterSvgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
