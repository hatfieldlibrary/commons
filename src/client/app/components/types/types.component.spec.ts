import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TypesComponent } from './types.component';
import {MatListModule, MatSelectionList} from '@angular/material';

describe('TypesComponent', () => {
  let component: TypesComponent;
  let fixture: ComponentFixture<TypesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TypesComponent, MatSelectionList],
      imports: [MatListModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TypesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
