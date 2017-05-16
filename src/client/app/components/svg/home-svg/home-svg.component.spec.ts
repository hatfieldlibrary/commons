import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeSvgComponent } from './home-svg.component';

describe('HomeSvgComponent', () => {
  let component: HomeSvgComponent;
  let fixture: ComponentFixture<HomeSvgComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeSvgComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeSvgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
