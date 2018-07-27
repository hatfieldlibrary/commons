import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BackBlackSvgComponent } from './back-black-svg.component';
import {MatIconModule, MatIconRegistry} from '@angular/material';
import {DomSanitizer} from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';

describe('BackBlackSvgComponent', () => {
  let component: BackBlackSvgComponent;
  let fixture: ComponentFixture<BackBlackSvgComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BackBlackSvgComponent ],
      imports: [MatIconModule, HttpClientModule]
    });
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BackBlackSvgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
