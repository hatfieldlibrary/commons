import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoSvgComponent } from './info-svg.component';
import {MatIconModule, MatIconRegistry} from "@angular/material";
import {DomSanitizer} from "@angular/platform-browser";

describe('InfoSvgComponent', () => {
  let component: InfoSvgComponent;
  let fixture: ComponentFixture<InfoSvgComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InfoSvgComponent ],
      imports: [MatIconModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    let iconRegistry = TestBed.get(MatIconRegistry);
    let sanitizer = TestBed.get(DomSanitizer);
    iconRegistry.addSvgIcon('info', sanitizer.bypassSecurityTrustResourceUrl('../../assets/img/svg/ic_info_outline_black_24px.svg'));
    fixture = TestBed.createComponent(InfoSvgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
