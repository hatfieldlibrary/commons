import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CollectionsSvgComponent } from './collections-svg.component';

describe('CollectionsSvgComponent', () => {
  let component: CollectionsSvgComponent;
  let fixture: ComponentFixture<CollectionsSvgComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CollectionsSvgComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CollectionsSvgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
