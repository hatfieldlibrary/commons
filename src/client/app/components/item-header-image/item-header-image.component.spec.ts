import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemHeaderImageComponent } from './item-header-image.component';

describe('ItemHeaderImageComponent', () => {
  let component: ItemHeaderImageComponent;
  let fixture: ComponentFixture<ItemHeaderImageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ItemHeaderImageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemHeaderImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
