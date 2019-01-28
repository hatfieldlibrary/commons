/*
 * Copyright (c) [2018] [Willamette University]
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

export const environment = {

  production: true,
  // The client host (needed by universal).
  origin: 'https://libmedia.willamette.edu',
  // REST API host. Can be localhost or production host
  // apiHost: 'https://libmedia.willamette.edu',
  apiHost: 'https://libmedia.willamette.edu',
  appRoot: '/commons/',
  // Base path, do not include beginning forward slash.
  appRoute: 'commons/',
  // Path to the REST API (proxy).
  apiRoot: '/tagger-3-api',
  // Path to images on tagger (proxy).
  imagePath: '/commons-images',
  // Authentication paths.
  authPath: '/com-auth',
  authCheck: 'https://libmedia.willamette.edu/com-check',
  defaultRoute: '/commons/collection/area/5',
  isDebugMode: false

};
