import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CollectionsSvgComponent } from './collections-svg.component';
import {MdIconModule, MdIconRegistry} from "@angular/material";
import {DomSanitizer} from "@angular/platform-browser";

describe('CollectionsSvgComponent', () => {
  let component: CollectionsSvgComponent;
  let fixture: ComponentFixture<CollectionsSvgComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CollectionsSvgComponent ],
      imports: [
        MdIconModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    let iconRegistry = TestBed.get(MdIconRegistry);
    let sanitizer = TestBed.get(DomSanitizer);
    iconRegistry.addSvgIcon('collections', sanitizer.bypassSecurityTrustResourceUrl('../../assets/img/svg/ic_collections_white_24px.svg'));
    fixture = TestBed.createComponent(CollectionsSvgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
