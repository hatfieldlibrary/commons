import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IconMenuSvg } from './menu-svg.component';

describe('IconMenuSvg', () => {
  let component: IconMenuSvg;
  let fixture: ComponentFixture<IconMenuSvg>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IconMenuSvg ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IconMenuSvg);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
