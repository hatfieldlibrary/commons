/*
 * Copyright (c) 2017.
 *
 *   This program is free software: you can redistribute it and/or modify
 *    it under the terms of the GNU General Public License as published by
 *    the Free Software Foundation, either version 3 of the License, or
 *    (at your option) any later version.
 *
 *    This program is distributed in the hope that it will be useful,
 *    but WITHOUT ANY WARRANTY; without even the implied warranty of
 *    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *    GNU General Public License for more details.
 *
 *   You should have received a copy of the GNU General Public License
 *    along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

/**
 * Created by mspalti on 3/6/17.
 */

'use strict';

const env = process.env.NODE_ENV || 'development';

let credentials;

let credentialsPath = require('./require-paths');

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
      authUrl: credentials.authUrl,
      nodeEnv: env
    },

    test: {
      logLevel: 'debug',
      useAuth: true,
      domain: credentials.domain,
      apiHost: credentials.apiHost,
      authUrl: credentials.authUrl,
      nodeEnv: env
    },

    production: {
      logLevel: 'debug',
      useAuth: true,
      domain: credentials.domain,
      apiHost: credentials.apiHost,
      authUrl: credentials.authUrl,
      nodeEnv: env
    }
  };


   public getConfig(s: string): any {
    return this.config[s];
  }

}

