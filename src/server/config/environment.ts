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

  private readonly hostEnvironment;
  private readonly credentials = {
    domain: '',
    apiHost: '',
    serverBaseURL: '',
    ssoBaseURL: '',
    validateURL: '',
    redisPort: ''
  };

  private config = {

    development: {
      logLevel: 'debug',
      useAuth: true,
      domain: this.credentials.domain,
      apiHost: this.credentials.apiHost,
      serverBaseURL: this.credentials.serverBaseURL,
      ssoBaseURL: this.credentials.ssoBaseURL,
      validateURL: this.credentials.validateURL,
      authPath: '/auth',
      authCheck: '/check',
      nodeEnv: 'development'
    },

    test: {
      logLevel: 'debug',
      useAuth: true,
      domain: this.credentials.domain,
      apiHost: this.credentials.apiHost,
      serverBaseURL: this.credentials.serverBaseURL,
      ssoBaseURL: this.credentials.ssoBaseURL,
      validateURL: this.credentials.validateURL,
      authPath: '/auth',
      authCheck: '/',
      nodeEnv: 'test'
    },

    production: {
      logLevel: 'debug',
      useAuth: true,
      domain: this.credentials.domain,
      apiHost: this.credentials.apiHost,
      serverBaseURL: this.credentials.serverBaseURL,
      ssoBaseURL: this.credentials.ssoBaseURL,
      validateURL: this.credentials.validateURL,
      redisPort: this.credentials.redisPort,
      authPath: '/commons-auth',
      authCheck: this.credentials.apiHost + '/commons-check',
      nodeEnv: 'production'
    }
  };

  constructor(hostEnvironment: string) {
    this.hostEnvironment = hostEnvironment;
    try {
      // The path to credentials.
      this.credentials = require('credentials');
    } catch (ex) {
      // No credentials ... try travis-ci credentials.
      console.log('Using travis credentials, really');
      this.credentials = require('../credentials/travis-credentials')

    }
  }

  public getConfig(): any {
    const configuration = this.config[this.hostEnvironment];
    configuration.domain = this.credentials.domain;
    configuration.apiHost = this.credentials.apiHost;
    configuration.serverBaseURL = this.credentials.serverBaseURL;
    configuration.ssoBaseURL = this.credentials.ssoBaseURL;
    configuration.validateURL = this.credentials.validateURL;
    configuration.redisPort = this.credentials.redisPort;
    configuration.nodeEnv = this.hostEnvironment;
    return configuration;
  }

}

