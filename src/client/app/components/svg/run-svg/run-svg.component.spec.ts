import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {RunSvgComponent} from './run-svg.component';
import {MatIconModule, MatIconRegistry} from '@angular/material';
import {DomSanitizer} from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';

describe('RunSvgComponent', () => {
  let component: RunSvgComponent;
  let fixture: ComponentFixture<RunSvgComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [RunSvgComponent],
      imports: [MatIconModule, HttpClientModule],
      providers: []
    });
  }));

  beforeEach(() => {
    const iconRegistry = TestBed.get(MatIconRegistry);
    const sanitizer = TestBed.get(DomSanitizer);
    iconRegistry.addSvgIcon('run', sanitizer.bypassSecurityTrustResourceUrl('../../assets/img/svg/ic_directions_run_black_24px.svg'));
    fixture = TestBed.createComponent(RunSvgComponent);
    component = fixture.componentInstance;
    // fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
