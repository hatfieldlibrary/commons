import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LockSvgComponent } from './lock-svg.component';
import {DomSanitizer} from '@angular/platform-browser';
import { MatIconModule, MatIconRegistry} from '@angular/material';
import {HttpClientModule} from '@angular/common/http';

describe('LockSvgComponent', () => {
  let component: LockSvgComponent;
  let fixture: ComponentFixture<LockSvgComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LockSvgComponent ],
      imports: [
        MatIconModule, HttpClientModule
      ]
    });
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LockSvgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
