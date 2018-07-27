import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AreasSvgComponent } from './areas-svg.component';
import {MatIconModule, MatIconRegistry} from '@angular/material';
import {DomSanitizer} from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';

describe('AreasSvgComponent', () => {
  let component: AreasSvgComponent;
  let fixture: ComponentFixture<AreasSvgComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AreasSvgComponent ],
      imports: [
        MatIconModule,
        HttpClientModule
      ],
      providers: [
      ]
    });
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AreasSvgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
