import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BackSvgComponent } from './back-svg.component';
import {DomSanitizer} from '@angular/platform-browser';
import { MatIconModule, MatIconRegistry} from '@angular/material';
import {HttpClientModule} from '@angular/common/http';

describe('BackSvgComponent', () => {
  let component: BackSvgComponent;
  let fixture: ComponentFixture<BackSvgComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BackSvgComponent ],
      imports: [
        MatIconModule, HttpClientModule
      ]
    });
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BackSvgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
