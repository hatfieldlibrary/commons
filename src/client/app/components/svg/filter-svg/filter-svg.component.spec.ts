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
    });
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FilterSvgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
