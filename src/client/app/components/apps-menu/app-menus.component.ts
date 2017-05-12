import {Component, Input, OnInit, Renderer2, ViewChild} from '@angular/core';
import {AreaType} from "../../shared/data-types/area.type";
import {MdSidenav} from "@angular/material";
import {Location} from '@angular/common';

@Component({
  selector: 'app-menus-component',
  templateUrl: './app-menus.component.html',
  styleUrls: ['./app-menus.component.css']
})
export class AppMenusComponent implements OnInit {

  @Input() areaList: AreaType[];
  @Input() state: boolean;
  @Input() title: string;
  @ViewChild('sidenav')
  public sideNavigate: MdSidenav;

  constructor(private location: Location) { }

  openMenu() {
    this.sideNavigate.open();
  }

  backClicked() {
    this.location.back();
  }

  ngOnInit() {
    this.sideNavigate.close();
  }

}
