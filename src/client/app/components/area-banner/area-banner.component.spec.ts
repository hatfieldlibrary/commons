import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AreaBannerComponent } from './area-banner.component';

describe('AreaBannerComponent', () => {
  let component: AreaBannerComponent;
  let fixture: ComponentFixture<AreaBannerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AreaBannerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AreaBannerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
