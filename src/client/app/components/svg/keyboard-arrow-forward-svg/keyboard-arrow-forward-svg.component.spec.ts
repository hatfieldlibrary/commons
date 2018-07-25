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
    const iconRegistry = TestBed.get(MatIconRegistry);
    const sanitizer = TestBed.get(DomSanitizer);
    iconRegistry.addSvgIcon('keyboard-forward', sanitizer.bypassSecurityTrustResourceUrl('../../assets/img/svg/ic_keyboard_arrow_right_black_48px.svg'));
    fixture = TestBed.createComponent(KeyboardArrowForwardSvgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
