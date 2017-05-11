import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppMenusComponent } from './app-menus.component';

describe('AppMenusComponent', () => {
  let component: AppMenusComponent;
  let fixture: ComponentFixture<AppMenusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppMenusComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppMenusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
