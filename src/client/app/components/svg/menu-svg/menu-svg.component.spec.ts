import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuSvgComponent } from './menu-svg.component';
import { MatIconModule, MatIconRegistry} from '@angular/material';
import {DomSanitizer} from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';

describe('MenuSvgComponent', () => {
  let component: MenuSvgComponent;
  let fixture: ComponentFixture<MenuSvgComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MenuSvgComponent ],
      imports: [
        MatIconModule, HttpClientModule
    ]
    });
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuSvgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
