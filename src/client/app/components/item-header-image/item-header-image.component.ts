import {

  ChangeDetectionStrategy, Component, DoCheck, HostBinding, Input, OnDestroy, OnInit,
  SecurityContext
} from '@angular/core';
import {DomSanitizer, SafeResourceUrl} from '@angular/platform-browser';
import {environment} from '../../environments/environment';
import {imageFadeIn} from '../../animation/animations';
import {MediaChange, ObservableMedia} from '@angular/flex-layout';
import {Subscription} from 'rxjs/Subscription';

@Component({
  selector: 'app-item-header-image',
  templateUrl: './item-header-image.component.html',
  styleUrls: ['./item-header-image.component.css'],
  animations: [imageFadeIn],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ItemHeaderImageComponent implements OnInit, OnDestroy, DoCheck {

  backgroundImage: SafeResourceUrl;
  currentImage = '';
  imageLoaded = false;
  isMobile = false;
  watcher: Subscription;

  @Input() image: string;
  // Use host binding for animation.
  @HostBinding('@imageShow') routeAnimation = true;
  @HostBinding('style.display') display = 'block';
  @HostBinding('style.position') position = 'absolute';
  @HostBinding('style.position') width = '100%';

  constructor(private sanitizer: DomSanitizer,
              public media: ObservableMedia) {
    this.image = '';
    this.watcher = this.media.subscribe((change: MediaChange) => {
      if (change.mqAlias === 'xs') {
        this.isMobile = true;
      } else {
        this.isMobile = false;
      }

    });

  }

  ngOnInit() {

    this.backgroundImage = this.sanitizer.bypassSecurityTrustUrl('');
    this.imageLoaded = false;
    this.currentImage = '';
    this.setImage();
  }

  ngDoCheck() {
    this.setImage();
  }

  /**
   *
   */
  setImageLoaded(): void {
    this.imageLoaded = true;
  }

  setImage() {

    if (this.image !== this.currentImage) {
      let url;
      if (this.isMobile) {
        url = environment.apiHost + environment.imagePath + '/resources/img/thumb/' + this.image;
      } else {
        url =  environment.apiHost + environment.imagePath + '/resources/img/full/' + this.image;
      }

      let backgroundImage = this.sanitizer.sanitize(SecurityContext.URL, url).toString();
      this.backgroundImage = this.sanitizer.bypassSecurityTrustUrl(backgroundImage);

    }
    this.currentImage = this.image;
  }

  /**
   * Unsubscribe media watcher.
   */
  ngOnDestroy(): void {
    if (this.watcher) {
      this.watcher.unsubscribe();
    }
  }


}
