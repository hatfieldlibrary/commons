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
     console.log('estigler')
    return this.config[s];
  }

}

