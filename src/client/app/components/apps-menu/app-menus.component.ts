import {ChangeDetectionStrategy, Component, Input, OnInit, ViewChild} from '@angular/core';
import {AreaType} from "../../shared/data-types/area.type";
import {MdSidenav} from "@angular/material";
import {Location} from '@angular/common';
import {NavigationEnd, Router} from "@angular/router";
import {UtilitiesService} from "../../services/utilities.service";
import {SubjectType} from "../../shared/data-types/subject.type";

@Component({
  selector: 'app-menus-component',
  templateUrl: './app-menus.component.html',
  styleUrls: ['./app-menus.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppMenusComponent implements OnInit {

  @Input() areaList: AreaType[];
  @Input() selectedArea: string;
  @Input() selectedSubject: SubjectType;
  @Input() showBack: boolean;
  @Input() state: boolean;
  @Input() title: string;
  @ViewChild('sidenav') sideNavigate: MdSidenav;
  public previousUrl: string = '';
  homeUrl: string = 'http://libmedia.willamette.edu/academiccommons';
  secondaryUrl: string = 'http://library.willamette.edu';
  tertiaryUrl: string = 'http://www.willamette.edu';

  constructor(private utils: UtilitiesService,
              private router: Router) {
    router.events
      .filter(event => event instanceof NavigationEnd)
      .subscribe((event: NavigationEnd) => {
        this.previousUrl = event.url;
      });
  }

  goToHome(): void {
    window.location.href = this.homeUrl;
  }

  goToSecondary(): void {
    window.location.href = this.secondaryUrl;
  }

  goToTertiary(): void {
    window.location.href= this.tertiaryUrl;
  }

  openMenu() {
    this.sideNavigate.open();
  }

  getBackLink(): string {
    let path = this.utils.getBackLink(this.selectedArea, this.selectedSubject);
    return path;
  }

  ngOnInit() {
    if (this.sideNavigate.close) {
      this.sideNavigate.close();
    }
  }

}
