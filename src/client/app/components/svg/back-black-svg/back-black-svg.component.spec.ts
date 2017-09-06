import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BackBlackSvgComponent } from './back-black-svg.component';
import {MdIconModule, MdIconRegistry} from "@angular/material";
import {DomSanitizer} from "@angular/platform-browser";

describe('BackBlackSvgComponent', () => {
  let component: BackBlackSvgComponent;
  let fixture: ComponentFixture<BackBlackSvgComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BackBlackSvgComponent ],
      imports: [MdIconModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    let iconRegistry = TestBed.get(MdIconRegistry);
    let sanitizer = TestBed.get(DomSanitizer);
    iconRegistry.addSvgIcon('back-black', sanitizer.bypassSecurityTrustResourceUrl('../../assets/img/svg/ic_arrow_back_black_24px.svg'));
    fixture = TestBed.createComponent(BackBlackSvgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
