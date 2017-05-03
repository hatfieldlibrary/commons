import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemLinksComponent } from './item-links.component';
import {MdButtonModule, MdInputModule, MdListModule, MdSelectModule} from "@angular/material";
import {FormsModule} from "@angular/forms";
import {LockSvgComponent} from "../svg/lock-svg/lock-svg.component";
import {SearchSvgComponent} from "../svg/search-svg/search-svg.component";
import {SearchService} from "../../services/search.service";
import {ActivatedRoute} from "@angular/router";
import {AuthCheckService} from "../../services/auth-check.service";
import {Store} from "@ngrx/store";
import {Observable} from "rxjs/Observable";

describe('ItemLinksComponent', () => {
  let component: ItemLinksComponent;
  let fixture: ComponentFixture<ItemLinksComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        ItemLinksComponent,
        LockSvgComponent,
        SearchSvgComponent
      ],
      imports: [
        MdListModule,
        MdButtonModule,
        MdInputModule,
        MdSelectModule,
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
