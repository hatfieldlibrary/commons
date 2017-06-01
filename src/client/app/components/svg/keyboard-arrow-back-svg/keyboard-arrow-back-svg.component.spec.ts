import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KeyboardArrowBackSvgComponent } from './keyboard-arrow-back-svg.component';

describe('KeyboardArrowBackSvgComponent', () => {
  let component: KeyboardArrowBackSvgComponent;
  let fixture: ComponentFixture<KeyboardArrowBackSvgComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KeyboardArrowBackSvgComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KeyboardArrowBackSvgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
