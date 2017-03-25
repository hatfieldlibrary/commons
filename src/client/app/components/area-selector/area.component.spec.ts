/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MaterialModule } from '@angular/material';
import { AreaComponent } from './area.component';
import {RouterTestingModule} from "@angular/router/testing";
import {appRoutes} from '../../app.module';
import {MainContainer} from "../../containers/main-container/main.container";
import {PageNotFoundComponent} from "../../shared/components/page-not-found/page-not-found.component";
import {AppComponent} from "../app.component";
import {ListComponent} from "../collection-list/list.component";
import {SubjectsComponent} from "../subject-selector/subjects.component";
import {ImageHeaderComponent} from "../image-header/image-header.component";
import {AreaInformationComponent} from "../area-information/area-information.component";
import {ItemContainerComponent} from "../../containers/item-container/item-container.component";
import {ItemComponent} from "../item/item.component";

describe('AreaComponent', () => {
  let component: AreaComponent;
  let fixture: ComponentFixture<AreaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppComponent,
        MainContainer,
        ListComponent,
        AreaComponent,
        SubjectsComponent,
        ImageHeaderComponent,
        AreaInformationComponent,
        ItemContainerComponent,
        ItemComponent,
        PageNotFoundComponent],
      imports: [
        MaterialModule,
        RouterTestingModule.withRoutes(appRoutes),
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AreaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
