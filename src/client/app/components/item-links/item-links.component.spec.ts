import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemLinksComponent } from './item-links.component';
import {MatButtonModule, MatInputModule, MatListModule, MatSelectModule} from "@angular/material";
import {FormsModule} from "@angular/forms";
import {LockSvgComponent} from "../svg/lock-svg/lock-svg.component";
import {SearchSvgComponent} from "../svg/search-svg/search-svg.component";
import {SearchService} from "../../services/search.service";
import {ActivatedRoute} from "@angular/router";
import {AuthCheckService} from "../../services/auth-check.service";
import {Store} from "@ngrx/store";
import {Observable} from "rxjs/Observable";
import {ItemSelectComponent} from "../item-select-options/item-select.component";
import {DatePickerSvgComponent} from "../svg/date-picker-svg/date-picker-svg.component";
import {MockBackend} from "@angular/http/testing";

describe('ItemLinksComponent', () => {
  let component: ItemLinksComponent;
  let fixture: ComponentFixture<ItemLinksComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        ItemLinksComponent,
        LockSvgComponent,
        SearchSvgComponent,
        DatePickerSvgComponent,
        ItemSelectComponent
      ],
      imports: [
        MatListModule,
        MatButtonModule,
        MatInputModule,
        MatSelectModule,
        FormsModule

      ],
      providers: [
        SearchService,
        AuthCheckService,
        {
          provide: ActivatedRoute,
          useValue: {
            params: new Observable<any>(),
            url: {
              map: () =>  Observable.of('')
            }
          }
        },
        {
          provide: Store,
          useClass: class {
            dispatch = jasmine.createSpy('dispatch');
            select = () => {
              return Observable.of({});
            };
          }
        },
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemLinksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
