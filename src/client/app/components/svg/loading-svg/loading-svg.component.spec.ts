import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadingSvgComponent } from './loading-svg.component';
import {MdIconModule, MdIconRegistry} from "@angular/material";
import {DomSanitizer} from "@angular/platform-browser";

describe('LoadingSvgComponent', () => {
  let component: LoadingSvgComponent;
  let fixture: ComponentFixture<LoadingSvgComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoadingSvgComponent ],
      imports: [MdIconModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    let iconRegistry = TestBed.get(MdIconRegistry);
    let sanitizer = TestBed.get(DomSanitizer);
    iconRegistry.addSvgIcon('loading', sanitizer.bypassSecurityTrustResourceUrl('../../assets/img/svg/loading-image.svg'));
    fixture = TestBed.createComponent(LoadingSvgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
