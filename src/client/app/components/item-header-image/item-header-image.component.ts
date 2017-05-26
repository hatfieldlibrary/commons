import {Component, HostBinding, OnInit, SecurityContext} from '@angular/core';
import {DomSanitizer, SafeResourceUrl} from "@angular/platform-browser";
import {Store} from "@ngrx/store";
import * as fromRoot from "../../reducers"
import {imageFadeIn} from "../../animation/animations";

@Component({
  selector: 'item-header-image',
  templateUrl: './item-header-image.component.html',
  styleUrls: ['./item-header-image.component.css'],
  animations: [imageFadeIn]
})
export class ItemHeaderImageComponent implements OnInit {

  backgroundImage: SafeResourceUrl;
  smallBackgroundImage: SafeResourceUrl;

  @HostBinding('@imageShow') routeAnimation = true;
  @HostBinding('style.display') display = 'block';
  @HostBinding('style.position') position = 'absolute';
  @HostBinding('style.position') width = '100%';

  constructor(private store: Store<fromRoot.State>, private sanitizer: DomSanitizer) { }

  ngOnInit() {

    this.backgroundImage = '';
    this.smallBackgroundImage = '';

    this.store.select(fromRoot.getItem).subscribe((item) => {
      this.setImage(item.collection.image);
    });

  }

  setImage(image: string) {

    let url = 'http://libapps.willamette.edu:3003/resources/img/full/' + image;
    let backgroundImage = this.sanitizer.sanitize(SecurityContext.URL, url).toString();
    this.backgroundImage = this.sanitizer.bypassSecurityTrustUrl(backgroundImage);

    let smallUrl = 'http://libapps.willamette.edu:3003/resources/img/thumb/' + image;
    let smallImage = this.sanitizer.sanitize(SecurityContext.URL, smallUrl).toString();
    this.smallBackgroundImage = this.sanitizer.bypassSecurityTrustUrl(smallImage);

  }

}
