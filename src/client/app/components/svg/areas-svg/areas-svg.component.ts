import {Component, OnDestroy, OnInit} from '@angular/core';
import {MatIconRegistry} from '@angular/material';
import {DomSanitizer} from '@angular/platform-browser';

@Component({
  selector: 'app-areas-svg',
  templateUrl: './areas-svg.component.html',
  styleUrls: ['./areas-svg.component.css']
})
export class AreasSvgComponent implements OnDestroy  {

  ngOnDestroy(): void {
    this.iconRegistry = null;
    this.sanitizer = null;
  }

  constructor(private iconRegistry: MatIconRegistry, private sanitizer: DomSanitizer) {
    iconRegistry.addSvgIcon(
      'areas',
      sanitizer.bypassSecurityTrustResourceUrl('../../assets/img/svg/ic_subject_white_24px.svg'));
  }

}
