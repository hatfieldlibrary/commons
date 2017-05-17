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
      ],
      providers: [
        MdIconRegistry,
        DomSanitizer
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeSvgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
