import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DatePickerSvgComponent } from './date-picker-svg.component';

describe('DatePickerSvgComponent', () => {
  let component: DatePickerSvgComponent;
  let fixture: ComponentFixture<DatePickerSvgComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DatePickerSvgComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DatePickerSvgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
