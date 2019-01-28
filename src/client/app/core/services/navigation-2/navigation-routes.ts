/*
 * Copyright (c) [2019] [Willamette University]
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 *
 * Author: Michael Spalti
 */

import {environment} from '../../../environments/environment';

/**
 * These navigation routes are used to create back links (from item to browse list).
 */
export class NavigationRoutes {

  public static areaGroupSubjectTypeLink(selectedArea: string,
                                    selectedGroup: string,
                                    selectedSubject: string,
                                    selectedTypes: string): string {
    return  environment.appRoot +
      `collection/category/${selectedGroup}/area/${selectedArea}/type/${selectedTypes}/subject/${selectedSubject}`;
  }

  public static areaGroupSubjectLink(selectedArea: string, selectedGroup: string, selectedSubject: string): string {
    return  environment.appRoot +
      `collection/category/${selectedGroup}/area/${selectedArea}/subject/${selectedSubject}`;
  }

  public static areaGroupTypeLink(selectedArea: string, selectedGroup: string, selectedTypes: string): string {
    return  environment.appRoot +
      `collection/category/${selectedGroup}/area/${selectedArea}/type/${selectedTypes}`;
  }

  public static areaGroupLink(selectedArea: string, selectedGroup: string): string {
    return  environment.appRoot +
      `collection/category/${selectedGroup}/area/${selectedArea}`;
  }

  public static areaSubjectTypeLink(selectedArea: string, selectedSubject: string, selectedTypes: string): string {
    return  environment.appRoot + `collection/area/${selectedArea}/type/${selectedTypes}/subject/${selectedSubject}`;
  }

  public static areaSubjectLink(selectedArea: string, selectedSubject: string): string {
    return  environment.appRoot + `collection/area/${selectedArea}/subject/${selectedSubject}`;
  }

  public static areaTypeLink(selectedArea: string, selectedTypes: string): string {
    return  environment.appRoot + `collection/area/${selectedArea}/type/${selectedTypes}`;
  }

  public static areaLink(selectedArea: string): string {
    return  environment.appRoot + `collection/area/${selectedArea}`;
  }

  public static globalLink(): string {
    return  environment.defaultRoute;
  }

  public static globalTypeLink(selectedTypes: string): string {
    return  environment.appRoot + `collection/type/${selectedTypes}`;
  }

  public static globalSubjectLink(selectedSubject: string): string {
    return  environment.appRoot + `collection/subject/${selectedSubject}`;
  }

  public static globalSubjectTypeLink(selectedSubject: string, selectedTypes: string): string {
    return  environment.appRoot + `collection}/subject/${selectedSubject}/type/${selectedTypes}`;
  }

}
