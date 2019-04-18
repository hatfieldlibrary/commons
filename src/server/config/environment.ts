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



/**
 * Created by mspalti on 3/6/17.
 */

export class Configuration {

   private readonly credentials;

  /**
   * The constructor retrieves the credentials module that
   * was compiled by webpack for the current environment
   * (production or development). These credentials will
   * not be available when built on TravisCi.
   */
  constructor() {
    try {
      // The path to credentials.
      this.credentials = require('credentials');
    } catch (exception) {
      // No credentials ... try travis-ci credentials.
      console.log('Using travis credentials, really.');
      this.credentials = require('../credentials/travis-credentials')

    }
  }

  public getConfig(): any {
    return this.credentials;
  }

}

