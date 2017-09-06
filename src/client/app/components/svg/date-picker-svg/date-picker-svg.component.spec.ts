import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DatePickerSvgComponent } from './date-picker-svg.component';
import {MdIconModule, MdIconRegistry} from "@angular/material";
import {DomSanitizer} from "@angular/platform-browser";

describe('DatePickerSvgComponent', () => {
  let component: DatePickerSvgComponent;
  let fixture: ComponentFixture<DatePickerSvgComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DatePickerSvgComponent ],
      imports: [MdIconModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    let iconRegistry = TestBed.get(MdIconRegistry);
    let sanitizer = TestBed.get(DomSanitizer);
    iconRegistry.addSvgIcon('date-picker', sanitizer.bypassSecurityTrustResourceUrl('../../assets/img/svg/ic_date_range_black_24px.svg'));
    fixture = TestBed.createComponent(DatePickerSvgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
