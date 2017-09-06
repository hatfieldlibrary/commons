import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CloseWhiteSvgComponent } from './close-white-svg.component';
import {MdIconModule, MdIconRegistry} from "@angular/material";
import {DomSanitizer} from "@angular/platform-browser";

describe('CloseWhiteSvgComponent', () => {
  let component: CloseWhiteSvgComponent;
  let fixture: ComponentFixture<CloseWhiteSvgComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CloseWhiteSvgComponent ],
      imports: [MdIconModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    let iconRegistry = TestBed.get(MdIconRegistry);
    let sanitizer = TestBed.get(DomSanitizer);
    iconRegistry.addSvgIcon('back-black', sanitizer.bypassSecurityTrustResourceUrl('../../assets/img/svg/ic_close_white_16px.svg'));
    fixture = TestBed.createComponent(CloseWhiteSvgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
