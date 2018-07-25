import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CollectionsSvgComponent } from './collections-svg.component';
import {MatIconModule, MatIconRegistry} from '@angular/material';
import {DomSanitizer} from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';

describe('CollectionsSvgComponent', () => {
  let component: CollectionsSvgComponent;
  let fixture: ComponentFixture<CollectionsSvgComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CollectionsSvgComponent ],
      imports: [
        MatIconModule, HttpClientModule
      ]
    });
  }));

  beforeEach(() => {
    const iconRegistry = TestBed.get(MatIconRegistry);
    const sanitizer = TestBed.get(DomSanitizer);
    iconRegistry.addSvgIcon('collections', sanitizer.bypassSecurityTrustResourceUrl('../../assets/img/svg/ic_collections_white_24px.svg'));
    fixture = TestBed.createComponent(CollectionsSvgComponent);
    component = fixture.componentInstance;
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
