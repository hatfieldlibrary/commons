import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {CollectionGridComponent} from './collection-grid.component';
import {ViewGridComponent} from '../svg/view-grid/view-grid.component';
import {ViewListComponent} from '../svg/view-list/view-list.component';
import {MatCardModule, MatGridListModule, MatIconModule} from '@angular/material';
import {LockSvgComponent} from '../svg/lock-svg/lock-svg.component';
import {FlexLayoutModule} from '@angular/flex-layout';

describe('CollectionGridComponent', () => {
  let component: CollectionGridComponent;
  let fixture: ComponentFixture<CollectionGridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        CollectionGridComponent,
        ViewGridComponent,
        ViewListComponent,
        ViewGridComponent,
        LockSvgComponent],
      imports: [
        MatGridListModule,
        MatCardModule,
        MatIconModule,
        // needed to test ObservableMedia
        FlexLayoutModule]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CollectionGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', async () => {
    expect(component).toBeTruthy();
  });
});
