import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemHeaderImageComponent } from './item-header-image.component';
import {FlexLayoutModule, ObservableMedia} from "@angular/flex-layout";
import {DomSanitizer} from "@angular/platform-browser";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";

describe('ItemHeaderImageComponent', () => {
  let component: ItemHeaderImageComponent;
  let fixture: ComponentFixture<ItemHeaderImageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ItemHeaderImageComponent ],
      imports: [FlexLayoutModule,BrowserAnimationsModule],
      providers: [
DomSanitizer,
        ObservableMedia
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemHeaderImageComponent);
    component = fixture.componentInstance;
    component.currentImage = "https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png";
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
