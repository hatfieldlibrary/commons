import {
  AfterContentChecked,
  AfterViewInit,
  ChangeDetectionStrategy, Component, DoCheck, HostBinding, Input, OnDestroy, OnInit,
  SecurityContext
} from '@angular/core';
import {DomSanitizer, SafeResourceUrl} from "@angular/platform-browser";
import {Store} from "@ngrx/store";
import * as fromRoot from "../../reducers"
import {imageFadeIn} from "../../animation/animations";
import {MediaChange, ObservableMedia} from "@angular/flex-layout";
import {Subscription} from "rxjs/Subscription";

@Component({
  selector: 'item-header-image',
  templateUrl: './item-header-image.component.html',
  styleUrls: ['./item-header-image.component.css'],
  animations: [imageFadeIn],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ItemHeaderImageComponent implements OnInit, DoCheck {

  backgroundImage: SafeResourceUrl;
  currentImage:string;
  imageLoaded: boolean;
  isMobile: boolean;
  watcher: Subscription;

  @Input() image: string;
  @HostBinding('@imageShow') routeAnimation = true;
  @HostBinding('style.display') display = 'block';
  @HostBinding('style.position') position = 'absolute';
  @HostBinding('style.position') width = '100%';

  constructor(private sanitizer: DomSanitizer,
              public media: ObservableMedia) {
this.image = '';
console.log('constrs')
  }

  ngOnInit() {
console.log('init')
    this.backgroundImage = this.sanitizer.bypassSecurityTrustUrl('');

    this.imageLoaded = false;
this.currentImage = '';
    this.watcher = this.media.subscribe((change: MediaChange) => {
      if (change.mqAlias === 'xs') {
        this.isMobile = true;
      } else {
        this.isMobile = false;
      }

    });

    // this.store.select(fromRoot.getItem).subscribe((item) => {
    //
    //   this.setImage(item.collection.image);
    //
    // });
    this.setImage();
  }

  ngDoCheck() {
    this.setImage();
  }

  setImageLoaded(): void {
    console.log('image loaded event')
    console.log('set image loaded to true')
    this.imageLoaded = true;
  }

  setImage() {
    console.log(this.image)

    if (this.image !== this.currentImage ) {


      let url;
      if (this.isMobile) {
        url = 'http://libapps.willamette.edu:3003/resources/img/thumb/' + this.image;
      } else {
        url = 'http://libapps.willamette.edu:3003/resources/img/full/' + this.image;
      }

      let backgroundImage = this.sanitizer.sanitize(SecurityContext.URL, url).toString();
      this.backgroundImage = this.sanitizer.bypassSecurityTrustUrl(backgroundImage);
console.log(this.backgroundImage)

    }
    this.currentImage = this.image;
  }

  /**
   * Unsubscribe media watcher.
   */
  ngOnDestroy(): void {
    this.watcher.unsubscribe();
  }


}
