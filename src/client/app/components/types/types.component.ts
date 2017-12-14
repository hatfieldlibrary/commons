import {AfterViewInit, Component, Input, OnDestroy, OnInit} from '@angular/core';
import * as typeActions from '../../actions/type.actions';
import * as listActions from '../../actions/collection.actions';
import {Store} from '@ngrx/store';
import * as fromRoot from '../../reducers';
import {FormArray, FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {ContentTypeListType} from '../../shared/data-types/content-types.type';
import {environment} from '../../environments/environment';
import {Router} from '@angular/router';


@Component({
  selector: 'app-types',
  templateUrl: './types.component.html',
  styleUrls: ['./types.component.css']
})
export class TypesComponent implements OnInit, AfterViewInit, OnDestroy {

  checkboxGroup: FormGroup;
  private formArrayRef: FormArray;
  private typesFormArray: FormArray;
  private selectedTypeArray: string[];
  @Input() typeList: ContentTypeListType[];
  @Input() selectedAreas: string;
  @Input() selectedSubject: string;
  @Input() selectedTypes: string;

  constructor(private formBuilder: FormBuilder,
              private router: Router,
              private store: Store<fromRoot.State>) {
  }

  _createIdQueryParam(typeList: FormArray): string {
    let typeId = '';
    typeList.getRawValue().forEach((id) => {
        typeId += id + ','
    });
    typeId = typeId.replace(/,\s*$/, '');
    return typeId;
  }

  _removeFromArray(index: number) {
    if (index >= 0) {
      this.typesFormArray.removeAt(index);
    }
  }

  _updateAreaFormArray(type: string, checked: boolean) {

    if (checked) {
      // Add the selected collection area to FormArray.
      this.typesFormArray.push(new FormControl(type));
    } else {
      // Remove the collection area from FormArray.
      const index = this.typesFormArray.controls.findIndex(x => x.value === type);
      this._removeFromArray(index);
    }

  }

  _navigateRoute(typeId: string) {
    if (this.selectedAreas !== '0' && typeof this.selectedAreas !== 'undefined') {
      if (typeof this.selectedSubject !== 'undefined') {
        if (typeId) {
          this.router.navigate([
            '/',
            environment.appRoot,
            'collection',
            'area',
            this.selectedAreas,
            'type',
            typeId,
            'subject',
            this.selectedSubject
          ]);
        } else {
          this.router.navigate([
            '/',
            environment.appRoot,
            'collection',
            'subject',
            this.selectedSubject,
            'area',
            this.selectedAreas,
            ]);
        }
      } else {
        if (typeId) {
          this.router.navigate([
            '/',
            environment.appRoot,
            'collection',
            'area',
            this.selectedAreas,
            'type',
            typeId]);
        } else {
          this.router.navigate([
            '/',
            environment.appRoot,
            'collection',
            'area',
            this.selectedAreas
          ]);
        }
      }
    } else if (this.selectedAreas === '0') {
      if (this.selectedSubject) {
        if (typeId) {
          this.router.navigate(['/', environment.appRoot, 'collection', 'type', typeId, 'subject', this.selectedSubject]);
        } else {
          this.router.navigate(['/', environment.appRoot, 'collection', 'subject', this.selectedSubject]);
        }
      } else {
        if (typeId) {
          this.router.navigate(['/', environment.appRoot, 'collection', 'type', typeId]);
        } else {
          this.router.navigate(['/', environment.appRoot, 'collection']);
        }
      }
    } else {
      if (typeId) {
        this.router.navigate(['/', environment.appRoot, 'collection', 'type', typeId]);
      } else {
        this.router.navigate(['/', environment.appRoot, 'collection']);
      }
    }
  }

  isSelected(id: string): boolean {
    if (this.selectedTypes) {
      return this.selectedTypes.indexOf(id) >= 0;
    }
    return false;
  }

  onChange(type: any, event: any) {
    this.store.dispatch(new listActions.CollectionReset());
    this._updateAreaFormArray(type.toString(), event.checked);
    const typeId = this._createIdQueryParam(this.typesFormArray);
    this._navigateRoute(typeId);

  }

  ngOnInit() {
    this.checkboxGroup = this.formBuilder.group({
      types: this.formBuilder.array([])
    });
    this.formArrayRef = <FormArray>this.checkboxGroup.controls.types;
    if (this.selectedTypes) {
      this.selectedTypeArray = this.selectedTypes.split(',');
      this.selectedTypeArray.forEach((id) => {
        this.formArrayRef.push(new FormControl(id));
      })
    }
  }

  ngAfterViewInit() {
    this.typesFormArray = <FormArray>this.checkboxGroup.controls.types;
  }

  ngOnDestroy(): void {
    this.typesFormArray = null;
    this.checkboxGroup = null;
    this.formArrayRef = null;

  }

}
