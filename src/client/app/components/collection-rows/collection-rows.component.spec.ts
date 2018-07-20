import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CollectionRowsComponent } from './collection-rows.component';
import {ViewGridComponent} from '../svg/view-grid/view-grid.component';
import {ViewListComponent} from '../svg/view-list/view-list.component';
import {LockSvgComponent} from '../svg/lock-svg/lock-svg.component';
import {MatIconModule, MatList, MatListModule} from '@angular/material';
import {FlexLayoutModule} from '@angular/flex-layout';

describe('CollectionRowsComponent', () => {
  let component: CollectionRowsComponent;
  let fixture: ComponentFixture<CollectionRowsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CollectionRowsComponent, ViewGridComponent, ViewListComponent, LockSvgComponent ],
      imports: [
        MatListModule,
        MatIconModule,
        // needed to test ObservableMedia
        FlexLayoutModule
      ]
    });
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CollectionRowsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', async () => {
    expect(component).toBeTruthy();
  });
});
