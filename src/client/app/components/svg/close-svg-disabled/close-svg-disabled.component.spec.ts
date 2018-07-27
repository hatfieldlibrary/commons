import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CloseSvgDisabledComponent } from './close-svg-disabled.component';
import {DomSanitizer} from '@angular/platform-browser';
import { MatIconModule, MatIconRegistry} from '@angular/material';
import {HttpClientModule} from '@angular/common/http';

describe('CloseSvgDisabledComponent', () => {
  let component: CloseSvgDisabledComponent;
  let fixture: ComponentFixture<CloseSvgDisabledComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CloseSvgDisabledComponent ],
      imports: [
        MatIconModule, HttpClientModule
      ]
    });
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CloseSvgDisabledComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
