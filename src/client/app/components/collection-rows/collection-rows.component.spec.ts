import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CollectionRowsComponent } from './collection-rows.component';
import {ViewGridComponent} from '../svg/view-grid/view-grid.component';

describe('CollectionRowsComponent', () => {
  let component: CollectionRowsComponent;
  let fixture: ComponentFixture<CollectionRowsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CollectionRowsComponent, ViewGridComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CollectionRowsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
