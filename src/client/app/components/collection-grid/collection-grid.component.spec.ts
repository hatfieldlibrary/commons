import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CollectionGridComponent } from './collection-grid.component';
import {ViewGridComponent} from '../svg/view-grid/view-grid.component';

describe('CollectionGridComponent', () => {
  let component: CollectionGridComponent;
  let fixture: ComponentFixture<CollectionGridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CollectionGridComponent, ViewGridComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CollectionGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
