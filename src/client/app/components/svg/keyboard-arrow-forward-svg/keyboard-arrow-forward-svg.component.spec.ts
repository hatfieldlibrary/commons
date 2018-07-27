import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KeyboardArrowForwardSvgComponent } from './keyboard-arrow-forward-svg.component';
import {MatIconModule, MatIconRegistry} from '@angular/material';
import {DomSanitizer} from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';

describe('KeyboardArrowForwardSvgComponent', () => {
  let component: KeyboardArrowForwardSvgComponent;
  let fixture: ComponentFixture<KeyboardArrowForwardSvgComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KeyboardArrowForwardSvgComponent ],
      imports: [MatIconModule, HttpClientModule ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KeyboardArrowForwardSvgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
