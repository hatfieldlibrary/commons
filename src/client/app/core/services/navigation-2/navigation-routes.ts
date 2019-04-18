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



  public static areaGroupSubjectTypeLink(rootPath: string, selectedArea: string,
                                    selectedGroup: string,
                                    selectedSubject: string,
                                    selectedTypes: string): string {
    return  rootPath +
      `collection/category/${selectedGroup}/area/${selectedArea}/type/${selectedTypes}/subject/${selectedSubject}`;
  }

  public static areaGroupSubjectLink(rootPath: string, selectedArea: string, selectedGroup: string, selectedSubject: string): string {
    return  rootPath +
      `collection/category/${selectedGroup}/area/${selectedArea}/subject/${selectedSubject}`;
  }

  public static areaGroupTypeLink(rootPath: string, selectedArea: string, selectedGroup: string, selectedTypes: string): string {
    return  rootPath +
      `collection/category/${selectedGroup}/area/${selectedArea}/type/${selectedTypes}`;
  }

  public static areaGroupLink(rootPath: string, selectedArea: string, selectedGroup: string): string {
    return  rootPath +
      `collection/category/${selectedGroup}/area/${selectedArea}`;
  }

  public static areaSubjectTypeLink(rootPath: string, selectedArea: string, selectedSubject: string, selectedTypes: string): string {
    return  rootPath + `collection/area/${selectedArea}/type/${selectedTypes}/subject/${selectedSubject}`;
  }

  public static areaSubjectLink(rootPath: string, selectedArea: string, selectedSubject: string): string {
    return  rootPath + `collection/area/${selectedArea}/subject/${selectedSubject}`;
  }

  public static areaTypeLink(rootPath: string, selectedArea: string, selectedTypes: string): string {
    return  rootPath + `collection/area/${selectedArea}/type/${selectedTypes}`;
  }

  public static areaLink(rootPath: string, selectedArea: string): string {
    console.log(rootPath + `collection/area/${selectedArea}`)
    return  rootPath + `collection/area/${selectedArea}`;
  }

  public static globalLink(rootPath: string): string {
    return  rootPath + environment.defaultRoute;
  }

  public static globalTypeLink(rootPath: string, selectedTypes: string): string {
    return  rootPath + `collection/type/${selectedTypes}`;
  }

  public static globalSubjectLink(rootPath: string, selectedSubject: string): string {
    return  rootPath + `collection/subject/${selectedSubject}`;
  }

  public static globalSubjectTypeLink(rootPath: string, selectedSubject: string, selectedTypes: string): string {
    return  rootPath + `collection/subject/${selectedSubject}/type/${selectedTypes}`;
  }

}
