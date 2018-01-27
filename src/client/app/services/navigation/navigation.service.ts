import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import {Router} from '@angular/router';

@Injectable()
export class NavigationService {

  constructor(private router: Router) { }

  /**
   * Uses router to navigate a route based on the provided query values.
   * @param {string} areaId area id (can be comma-separated list).
   * @param {string} typeId the type id (can be comma-separated list).
   * @param {string} subjectId the subject id.
   */
  public navigateRoute(areaId: string, typeId: string, subjectId: string): void {

    if (this.isSubjectSelected(subjectId) && this.isTypeSelected(typeId) && this.isAreaSelected(areaId)) {
      this.router.navigate(['/',
        environment.appRoot,
        'collection',
        'area', areaId,
        'type', typeId,
        'subject', subjectId
      ]);
    } else if (this.isSubjectSelected(subjectId) && this.isAreaSelected(areaId)) {
      this.router.navigate(['/',
        environment.appRoot,
        'collection',
        'area', areaId,
        'subject', subjectId
      ]);
    } else if (this.isTypeSelected(typeId) && this.isAreaSelected(areaId)) {
      this.router.navigate(['/',
        environment.appRoot,
        'collection',
        'area', areaId,
        'type', typeId
      ]);
    } else if (this.isTypeSelected(typeId) && this.isSubjectSelected(subjectId)) {
      this.router.navigate(['/',
        environment.appRoot,
        'collection',
        'type', typeId,
        'subject', subjectId
        ]);
    } else if (this.isTypeSelected(typeId)) {
      this.router.navigate(['/', environment.appRoot, 'collection', 'type', typeId]);
    } else if (this.isAreaSelected(areaId)) {
      this.router.navigate(['/', environment.appRoot, 'collection', 'area', areaId]);
    } else {
      this.router.navigate(['/', environment.appRoot, 'collection']);
    }
  }

  private isAreaSelected(areaId: string): boolean {
    // the global areaId can be a string with length zero, or 0.
    return (areaId.length > 0) && (areaId !== '0');
  }

  private isSubjectSelected(subjectId: string): boolean {
    return (typeof subjectId !== 'undefined') && (subjectId !== '0');
  }

  private isTypeSelected(typeId: string): boolean {
    console.log(typeId)
    return (typeof typeId !== 'undefined') && (typeId.length) !== 0 && (typeId !== '0');
  }


}
