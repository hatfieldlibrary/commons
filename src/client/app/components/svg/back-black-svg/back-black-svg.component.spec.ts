import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BackBlackSvgComponent } from './back-black-svg.component';

describe('BackBlackSvgComponent', () => {
  let component: BackBlackSvgComponent;
  let fixture: ComponentFixture<BackBlackSvgComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BackBlackSvgComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BackBlackSvgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
