/*
 * Copyright (c) 2017.
 *
 *   This program is free software: you can redistribute it and/or modify
 *    it under the terms of the GNU General Public License as published by
 *    the Free Software Foundation, either version 3 of the License, or
 *    (at your option) any later version.
 *
 *    This program is distributed in the hope that it will be useful,
 *    but WITHOUT ANY WARRANTY; without even the implied warranty of
 *    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *    GNU General Public License for more details.
 *
 *   You should have received a copy of the GNU General Public License
 *    along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

import {Component, Input, OnChanges, OnInit, SecurityContext, SimpleChanges, ViewChild} from '@angular/core';
import {Location} from '@angular/common';
import {AreaType} from "../../shared/data-types/area.type";
import {DomSanitizer, SafeResourceUrl} from "@angular/platform-browser";

@Component({
  selector: 'item-header',
  templateUrl: 'item-header.component.html',
  styleUrls: ['item-header.component.css']
})
export class ItemHeaderComponent implements OnChanges {


  @Input() image: string;
  @Input() areaList: AreaType[];

  @ViewChild('sidenav') public sideNavigate;
  backgroundImage: SafeResourceUrl = '';

  constructor(private sanitizer: DomSanitizer, private location: Location) { }



  backClicked() {
    this.location.back();
  }

  openMenu() {
    this.sideNavigate.open();
  }

  onSelected(selected: boolean) {
    selected ? this.sideNavigate.close() : this.sideNavigate.open();
  }


  ngOnChanges(changes: SimpleChanges) {

    let url = 'http://libapps.willamette.edu:3003/resources/img/full/' + changes['image'].currentValue;
    let image= this.sanitizer.sanitize(SecurityContext.URL, url).toString();

    this.backgroundImage = this.sanitizer.bypassSecurityTrustStyle('url('+image+')');


  }

}
