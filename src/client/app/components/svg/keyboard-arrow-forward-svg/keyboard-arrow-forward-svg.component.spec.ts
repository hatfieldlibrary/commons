import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KeyboardArrowForwardSvgComponent } from './keyboard-arrow-forward-svg.component';

describe('KeyboardArrowForwardSvgComponent', () => {
  let component: KeyboardArrowForwardSvgComponent;
  let fixture: ComponentFixture<KeyboardArrowForwardSvgComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KeyboardArrowForwardSvgComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KeyboardArrowForwardSvgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
