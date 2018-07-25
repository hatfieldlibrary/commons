import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KeyboardArrowBackSvgComponent } from './keyboard-arrow-back-svg.component';
import {MatIconModule, MatIconRegistry} from '@angular/material';
import {DomSanitizer} from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';

describe('KeyboardArrowBackSvgComponent', () => {
  let component: KeyboardArrowBackSvgComponent;
  let fixture: ComponentFixture<KeyboardArrowBackSvgComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KeyboardArrowBackSvgComponent ],
      imports: [MatIconModule, HttpClientModule ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    const iconRegistry = TestBed.get(MatIconRegistry);
    const sanitizer = TestBed.get(DomSanitizer);
    iconRegistry.addSvgIcon('keyboard-back', sanitizer.bypassSecurityTrustResourceUrl('../../assets/img/svg/ic_keyboard_arrow_left_black_48px.svg'));
    fixture = TestBed.createComponent(KeyboardArrowBackSvgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
