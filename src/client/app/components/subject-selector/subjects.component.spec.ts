/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed  } from '@angular/core/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {MaterialModule} from "@angular/material";
import {appRoutes} from '../../app.module';
import { SubjectsComponent } from './subjects.component';
import {MainContainer} from "../../containers/main-container/main.container";
import {PageNotFoundComponent} from "../../shared/components/page-not-found/page-not-found.component";
import {AppComponent} from "../app.component";
import {ListComponent} from "../collection-list/list.component";
import {AreaComponent} from "../area-selector/area.component";
import {ImageHeaderComponent} from "../image-header/image-header.component";
import {AreaInformationComponent} from "../area-information/area-information.component";
import {ItemContainerComponent} from "../../containers/item-container/item-container.component";
import {ItemComponent} from "../item/item.component";

describe('SubjectsComponent', () => {
  let component: SubjectsComponent;
  let fixture: ComponentFixture<SubjectsComponent>;

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
        PageNotFoundComponent ],
      imports: [
        MaterialModule,
        RouterTestingModule.withRoutes(appRoutes),
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubjectsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
