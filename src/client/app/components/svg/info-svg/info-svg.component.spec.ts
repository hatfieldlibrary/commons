import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoSvgComponent } from './info-svg.component';

describe('InfoSvgComponent', () => {
  let component: InfoSvgComponent;
  let fixture: ComponentFixture<InfoSvgComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InfoSvgComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InfoSvgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
