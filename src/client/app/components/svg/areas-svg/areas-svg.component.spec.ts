import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AreasSvgComponent } from './areas-svg.component';
import {MdIconModule, MdIconRegistry} from "@angular/material";
import {DomSanitizer} from "@angular/platform-browser";

describe('AreasSvgComponent', () => {
  let component: AreasSvgComponent;
  let fixture: ComponentFixture<AreasSvgComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AreasSvgComponent ],
      imports: [
        MdIconModule
      ],
      providers: [
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    let iconRegistry = TestBed.get(MdIconRegistry);
    let sanitizer = TestBed.get(DomSanitizer);
    iconRegistry.addSvgIcon('areas', sanitizer.bypassSecurityTrustResourceUrl('../../assets/img/svg/ic_subject_white_24px.svg'));
    fixture = TestBed.createComponent(AreasSvgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
