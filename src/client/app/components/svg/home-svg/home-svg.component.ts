import {Component} from '@angular/core';
import {MatIconRegistry} from '@angular/material';
import {DomSanitizer} from '@angular/platform-browser';

@Component({
  selector: 'app-home-svg',
  templateUrl: './home-svg.component.html',
  styleUrls: ['./home-svg.component.css']
})
export class HomeSvgComponent {

  constructor(private iconRegistry: MatIconRegistry, private sanitizer: DomSanitizer) {
    iconRegistry.addSvgIcon(
      'home',
      sanitizer.bypassSecurityTrustResourceUrl('../../assets/img/svg/ic_home_white_24px.svg'));
  }

}
