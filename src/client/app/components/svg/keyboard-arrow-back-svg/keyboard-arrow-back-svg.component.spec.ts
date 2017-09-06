import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KeyboardArrowBackSvgComponent } from './keyboard-arrow-back-svg.component';
import {MdIconModule, MdIconRegistry} from "@angular/material";
import {DomSanitizer} from "@angular/platform-browser";

describe('KeyboardArrowBackSvgComponent', () => {
  let component: KeyboardArrowBackSvgComponent;
  let fixture: ComponentFixture<KeyboardArrowBackSvgComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KeyboardArrowBackSvgComponent ],
      imports: [MdIconModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    let iconRegistry = TestBed.get(MdIconRegistry);
    let sanitizer = TestBed.get(DomSanitizer);
    iconRegistry.addSvgIcon('keyboard-back', sanitizer.bypassSecurityTrustResourceUrl('../../assets/img/svg/ic_keyboard_arrow_left_black_48px.svg'));
    fixture = TestBed.createComponent(KeyboardArrowBackSvgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
