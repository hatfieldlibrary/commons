import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeSvgComponent } from './home-svg.component';
import {DomSanitizer} from '@angular/platform-browser';
import {MatIconModule, MatIconRegistry} from '@angular/material';
import {HttpClientModule} from '@angular/common/http';

describe('HomeSvgComponent', () => {
  let component: HomeSvgComponent;
  let fixture: ComponentFixture<HomeSvgComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeSvgComponent ],
      imports: [
        MatIconModule, HttpClientModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    const iconRegistry = TestBed.get(MatIconRegistry);
    const sanitizer = TestBed.get(DomSanitizer);
    iconRegistry.addSvgIcon('home', sanitizer.bypassSecurityTrustResourceUrl('../../assets/img/svg/ic_home_white_24px.svg'));
    fixture = TestBed.createComponent(HomeSvgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
