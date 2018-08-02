/*
 * Copyright (c) [2018] [Willamette University]
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 *
 * Author: Michael Spalti
 */

import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ItemHeaderImageComponent} from './item-header-image.component';
import {FlexLayoutModule} from '@angular/flex-layout';
import {DomSanitizer} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

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

  beforeAll(() => {
    window.onbeforeunload = () => 'Oh no!';
  });

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
    spyOn(sanitizer, 'sanitize').and.callThrough();
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
