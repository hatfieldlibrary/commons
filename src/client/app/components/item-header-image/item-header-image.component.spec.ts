import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ItemHeaderImageComponent} from './item-header-image.component';
import {FlexLayoutModule} from "@angular/flex-layout";
import {DomSanitizer} from "@angular/platform-browser";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";

describe('ItemHeaderImageComponent', () => {
  let component: ItemHeaderImageComponent;
  let fixture: ComponentFixture<ItemHeaderImageComponent>;
  let sanitizer;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ItemHeaderImageComponent],
      imports: [FlexLayoutModule, BrowserAnimationsModule],
      providers: [
        {
          provide: DomSanitizer,
          useClass: class {
            sanitize(securityContext, url) {
              return url
            };

            bypassSecurityTrustUrl(url) {
              return url;
            }
          }
        },
        // needed to test ObservableMedia
        FlexLayoutModule
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemHeaderImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    sanitizer = fixture.debugElement.injector.get(DomSanitizer);
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should load mobile image', () => {
    component.isMobile = true;
    component.image = 'imageone';
    component.currentImage = 'imagetwo';
    fixture.detectChanges();
    component.setImage();
    expect(component.backgroundImage).toContain('thumb');
    expect(component.currentImage).toEqual('imageone');

  });

  it('should load full size image', () => {
    component.isMobile = false;
    component.image = 'imageone';
    component.currentImage = 'imagetwo';
    fixture.detectChanges();
    component.setImage();
    expect(component.backgroundImage).toContain('full');
    expect(component.currentImage).toEqual('imageone');

  });

  it('should use current image', () => {
    spyOn(sanitizer,'sanitize').and.callThrough();
    component.isMobile = false;
    component.image = 'imageone';
    component.currentImage = 'imageone';
    fixture.detectChanges();
    component.setImage();
    // sanitize will not be called
    expect(sanitizer.sanitize).not.toHaveBeenCalled();

  });

  it('should set image loaded to true', () => {
    expect(component.imageLoaded).toBe(false);
    component.setImageLoaded();
    expect(component.imageLoaded).toBe(true);
  })

});
