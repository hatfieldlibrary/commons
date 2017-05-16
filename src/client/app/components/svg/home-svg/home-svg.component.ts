import { Component, OnInit } from '@angular/core';
import {MdIconRegistry} from "@angular/material";
import {DomSanitizer} from "@angular/platform-browser";

@Component({
  selector: 'home-svg',
  templateUrl: './home-svg.component.html',
  styleUrls: ['./home-svg.component.css']
})
export class HomeSvgComponent implements OnInit {

  constructor(iconRegistry: MdIconRegistry, sanitizer: DomSanitizer) {
    iconRegistry.addSvgIcon(
      'home',
      sanitizer.bypassSecurityTrustResourceUrl('../../assets/img/svg/ic_home_white_24px.svg'));
  }

  ngOnInit() {
  }

}
