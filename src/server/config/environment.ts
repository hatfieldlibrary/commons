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

'use strict';

const env = process.env.NODE_ENV || 'development';

let credentials;

const credentialsPath = require('./require-paths');

try {

  // The path to credentials.
  credentials = require(credentialsPath.path(env) + 'credentials');

} catch (ex) {
  // No credentials ... try travis-ci credentials.
  console.log('Using travis credentials');
  credentials = require('../credentials/travis-credentials')

}

export interface AppConfig {
  getConfig(s: string): any;
}

export class Configuration implements AppConfig {

  private config = {

    development: {
      logLevel: 'debug',
      useAuth: true,
      domain: credentials.domain,
      apiHost: credentials.apiHost,
      serverBaseURL: credentials.serverBaseURL,
      ssoBaseURL: credentials.ssoBaseURL,
      validateURL: credentials.validateURL,
      authPath: '/auth',
      authCheck: '/check',
      nodeEnv: env
    },

    test: {
      logLevel: 'debug',
      useAuth: true,
      domain: credentials.domain,
      apiHost: credentials.apiHost,
      serverBaseURL: credentials.serverBaseURL,
      ssoBaseURL: credentials.ssoBaseURL,
      validateURL: credentials.validateURL,
      authPath: '/auth',
      authCheck: '/',
      nodeEnv: env
    },

    production: {
      logLevel: 'debug',
      useAuth: true,
      domain: credentials.domain,
      apiHost: credentials.apiHost,
      serverBaseURL: credentials.serverBaseURL,
      ssoBaseURL: credentials.ssoBaseURL,
      validateURL: credentials.validateURL,
      redisPort: credentials.redisPort,
      authPath: '/commons-auth',
      authCheck: '/commons-check',
      nodeEnv: env
    }
  };


   public getConfig(s: string): any {
    return this.config[s];
  }

}

