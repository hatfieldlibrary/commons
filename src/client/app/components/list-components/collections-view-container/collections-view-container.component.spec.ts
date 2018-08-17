import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CollectionsViewContainerComponent } from './collections-view-container.component';

describe('CollectionListContainerComponent', () => {
  let component: CollectionsViewContainerComponent;
  let fixture: ComponentFixture<CollectionsViewContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CollectionsViewContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CollectionsViewContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
