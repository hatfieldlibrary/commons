import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HelpSvgComponent } from './help-svg.component';
import {MatIconModule, MatIconRegistry} from '@angular/material';
import {DomSanitizer} from '@angular/platform-browser';

describe('HelpSvgComponent', () => {
  let component: HelpSvgComponent;
  let fixture: ComponentFixture<HelpSvgComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HelpSvgComponent ],
      imports: [MatIconModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    const iconRegistry = TestBed.get(MatIconRegistry);
    const sanitizer = TestBed.get(DomSanitizer);
    iconRegistry.addSvgIcon('filter-icon', sanitizer.bypassSecurityTrustResourceUrl('../../assets/img/svg/ic_help_outline_black_24px.svg'));
    fixture = TestBed.createComponent(HelpSvgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
