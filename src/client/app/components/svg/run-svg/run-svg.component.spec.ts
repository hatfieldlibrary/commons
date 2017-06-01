import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RunSvgComponent } from './run-svg.component';

describe('RunSvgComponent', () => {
  let component: RunSvgComponent;
  let fixture: ComponentFixture<RunSvgComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RunSvgComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RunSvgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
