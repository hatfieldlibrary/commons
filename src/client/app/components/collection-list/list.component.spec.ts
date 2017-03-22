/* tslint:disable:no-unused-variable */
import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {By} from '@angular/platform-browser';
import {DebugElement, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {MaterialModule} from "@angular/material";
import {ListComponent} from './list.component';
import {RouterTestingModule} from "@angular/router/testing";
import {appRoutes} from '../../app.module';
import {PageNotFoundComponent} from "../../shared/components/page-not-found/page-not-found.component";
import {MainContainer} from "../../containers/main.container";
import {AppComponent} from "../app.component";
import {AreaComponent} from "../area-selector/area.component";
import {SubjectsComponent} from "../subject-selector/subjects.component";
import {ImageHeaderComponent} from "../image-header/image-header.component";
import {AreaInformationComponent} from "../area-information/area-information.component";


describe('ListComponent', () => {
  let component: ListComponent;
  let fixture: ComponentFixture<ListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AppComponent,
        MainContainer,
        ListComponent,
        AreaComponent,
        SubjectsComponent,
        ImageHeaderComponent,
        AreaInformationComponent,
        PageNotFoundComponent],
      imports: [
        MaterialModule,
        RouterTestingModule.withRoutes(appRoutes),
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
