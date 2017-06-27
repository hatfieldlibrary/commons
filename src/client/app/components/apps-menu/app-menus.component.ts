import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {AreaType} from "../../shared/data-types/area.type";
import {MdSidenav} from "@angular/material";
import {Location} from '@angular/common';
import {NavigationEnd, Router} from "@angular/router";

@Component({
  selector: 'app-menus-component',
  templateUrl: './app-menus.component.html',
  styleUrls: ['./app-menus.component.css']
})
export class AppMenusComponent implements OnInit {

  @Input() areaList: AreaType[];
  @Input() selectedArea: string;
  @Input() state: boolean;
  @Input() title: string;
  @ViewChild('sidenav') sideNavigate: MdSidenav;
  public previousUrl: string = '';
  private myE:NavigationEnd;

  constructor(private location: Location, private router: Router) {
    router.events
      .filter(event => event instanceof NavigationEnd)
      .subscribe((event:NavigationEnd) => {
        console.log('prev:', this.previousUrl);
        console.log(event.url)
        this.previousUrl = event.url;


      });
  }

  openMenu() {
    this.sideNavigate.open();
  }

  backLink(): string{
    if (this.selectedArea === '0') {
      return '/commons-preview/collection';
    }
    return '/commons-preview/collection/area/' + this.selectedArea;
  }

  ngOnInit() {
    if (this.sideNavigate.close) {
      this.sideNavigate.close();
    }
  }

}