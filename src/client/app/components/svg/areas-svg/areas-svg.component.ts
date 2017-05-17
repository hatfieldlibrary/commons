import { Component, OnInit } from '@angular/core';
import {MdIconRegistry} from "@angular/material";
import {DomSanitizer} from "@angular/platform-browser";

@Component({
  selector: 'areas-svg',
  templateUrl: './areas-svg.component.html',
  styleUrls: ['./areas-svg.component.css']
})
export class AreasSvgComponent implements OnInit {

  constructor(iconRegistry: MdIconRegistry, sanitizer: DomSanitizer) {
    iconRegistry.addSvgIcon(
      'areas',
      sanitizer.bypassSecurityTrustResourceUrl('../../assets/img/svg/ic_subject_white_24px.svg'));
  }

  ngOnInit() {
  }

}
