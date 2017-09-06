import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeSvgComponent } from './home-svg.component';
import {DomSanitizer} from "@angular/platform-browser";
import {MdIconModule, MdIconRegistry} from "@angular/material";

describe('HomeSvgComponent', () => {
  let component: HomeSvgComponent;
  let fixture: ComponentFixture<HomeSvgComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeSvgComponent ],
      imports: [
        MdIconModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    let iconRegistry = TestBed.get(MdIconRegistry);
    let sanitizer = TestBed.get(DomSanitizer);
    iconRegistry.addSvgIcon('home', sanitizer.bypassSecurityTrustResourceUrl('../../assets/img/svg/ic_home_white_24px.svg'));
    fixture = TestBed.createComponent(HomeSvgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
