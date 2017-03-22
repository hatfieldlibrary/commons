/* tslint:disable:no-unused-variable */

import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';
import {RouterTestingModule} from "@angular/router/testing";
import {} from 'jasmine';
import {ImageHeaderComponent} from "./image-header/image-header.component";
import {appRoutes} from '../app.module';
import {MainContainer} from "../containers/main.container";
import {ListComponent} from "./collection-list/list.component";
import {AreaComponent} from "./area-selector/area.component";
import {SubjectsComponent} from "./subject-selector/subjects.component";
import {AreaInformationComponent} from "./area-information/area-information.component";
import {PageNotFoundComponent} from "../shared/components/page-not-found/page-not-found.component";
import {MaterialModule} from "@angular/material";

describe('AppComponent', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        MainContainer,
        ListComponent,
        AreaComponent,
        SubjectsComponent,
        ImageHeaderComponent,
        AreaInformationComponent,
        PageNotFoundComponent
      ],
      imports: [
        MaterialModule,
        RouterTestingModule.withRoutes(appRoutes),
      ]
    });
    TestBed.compileComponents();
  });

  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));


});
