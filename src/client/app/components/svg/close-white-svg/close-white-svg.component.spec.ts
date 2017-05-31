import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CloseWhiteSvgComponent } from './close-white-svg.component';

describe('CloseWhiteSvgComponent', () => {
  let component: CloseWhiteSvgComponent;
  let fixture: ComponentFixture<CloseWhiteSvgComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CloseWhiteSvgComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CloseWhiteSvgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
