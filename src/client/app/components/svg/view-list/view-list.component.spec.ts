import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewListComponent } from './view-list.component';
import {MatIconModule} from '@angular/material';
import {HttpClientModule} from '@angular/common/http';

describe('ViewListComponent', () => {
  let component: ViewListComponent;
  let fixture: ComponentFixture<ViewListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewListComponent ],
      imports: [MatIconModule, HttpClientModule]
    });
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
