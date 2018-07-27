import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HelpSvgComponent } from './help-svg.component';
import {MatIconModule, MatIconRegistry} from '@angular/material';
import {DomSanitizer} from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';

describe('HelpSvgComponent', () => {
  let component: HelpSvgComponent;
  let fixture: ComponentFixture<HelpSvgComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HelpSvgComponent ],
      imports: [MatIconModule, HttpClientModule]
    });
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HelpSvgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
