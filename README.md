# Commons
[![Build Status](https://travis-ci.org/hatfieldlibrary/commons.svg?branch=master)](https://travis-ci.org/hatfieldlibrary/commons)
[![Coverage Status](https://coveralls.io/repos/github/hatfieldlibrary/commons/badge.svg?branch=master)](https://coveralls.io/github/hatfieldlibrary/commons?branch=master)
[![bitHound Overall Score](https://www.bithound.io/github/hatfieldlibrary/commons/badges/score.svg)](https://www.bithound.io/github/hatfieldlibrary/commons)
[![bitHound Dependencies](https://www.bithound.io/github/hatfieldlibrary/commons/badges/dependencies.svg)](https://www.bithound.io/github/hatfieldlibrary/commons/master/dependencies/npm)
[![bitHound Code](https://www.bithound.io/github/hatfieldlibrary/commons/badges/code.svg)](https://www.bithound.io/github/hatfieldlibrary/commons)

The Commons is designed for publishing information about digital projects and collections that are maintained within institutional repositories like DSpace, Contentdm, and Hydra or
 that exist independently as unique, standalone projects like Omeka exhibits and public websites. The goals of the Commons project include deep integration with 
 repository services through shared authentication and authorization and targeted search capability.  

The Commons relies on the [Tagger-2](https://github.com/hatfieldlibrary/tagger-2) public API for data.  The Commons is integrated with the [dspace-client project](https://github.com/hatfieldlibrary/dspace-angular-client) for single sign on and automatic login. 
 [Passport](http://passportjs.org/) middleware is used for CAS authentication. (Other authentication services can be used by installing and configuring the required Passport authentication strategy. See `server/config/auth-config.ts`)    Authentication strategies require information provided in the credentials.js file (described below). [Redis](https://redis.io/) is used as the session store in
 production environments and is necessary for deployment.

The project uses [Angular](https://angular.io/), [ngrx](https://github.com/ngrx), and [Angular Material](https://material.angular.io/).
The [Angular-CLI](https://cli.angular.io/) is used to develop, test and build. The  project is published with a [Node.js](https://nodejs.org/en/) server
 runtime using [Express](https://expressjs.com/) middleware.
Both client and server code is written in Typescript. 

## Development 

The Commons is designed to use with the Tagger-2 REST API. You will need that project running with a production or development
server before starting a Commons development server.  

You will also need to provide a configuration file in your home directory (Mac or Windows).  Add this file
`etc/commons/credentials.js` to your home directory and edit the file to provide the following information: 

```javascript
'use strict';

var credentials = {

  serverBaseURL: 'the url expected by your CAS server, including port (this is not provided by the current CAS strategy implementation',
  ssoBaseURL:' url of your CAS server',
  validateURL: 'path to validation service',
  domain: 'your domain, e.g. mycampus.edu',
  redisPort: 6370 // unused in development, production only

};

module.exports = credentials;
```

### Using Angular-CLI Development Server
Run `npm run start:dev` to start the dev serve using npm. This will use the copy of angular-cli included in the project.  You should not need to have angular-cli installed globally. 

### Using Node nodemon
Run `npm run build:server:dev` to run the development server under (nodemon)[https://github.com/remy/nodemon]. This can be
useful for testing CAS authentication, since it allows you to use your machines IP address and port number (xxx.xxx.xxx.xxx:3000). This might also have been
possible via CLI configuration.  If testing with the local CAS authentication service, remember that your development machine needs to be listed as a valid target.

## Code Scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive/pipe/service/class/module`.

## Build

The npm production build will have used the `environment.prod` file from `src/client/app/environments`.  This file must contain information that will used
 by the client when used in production.  Edit accordingly before you build.
 
Run `npm run build:prod`. The build artifacts will be stored in the `dist/` directory. This script will build using the `--prod` and `--aot` flags.


### Deploy with Strongloop slc
[Strongloop slc](http://strong-pm.io/) is a convenient way to bundle the application for deployment.  To install, execute `npm install -g strongloop`. This will install
Strongloop globally on your system.  Then to build, execute `slc build --pack --install`.  This will create a .tgz file of the project with development dependencies removed. 
Strongloop can do more for you (see documentation).  For our purposes, we are still using the [forever](https://github.com/foreverjs/forever) daemon and the linux SysV init system.

You will need to provide the server's 'credentials.js` file in the directory `/etc/commons`. 

### Docker

At the moment, the docker image is experimental and not used in our production setting. But here are a few things to know. 

To use Docker, you will first need to install it on your machine.
 
A DockerFile is included in the project. 

Before working with Docker, be sure to first build the project with `npm run build:prod`.

Next, to build a docker image from the latest production build, execute `docker build -t <name>/<tag>:latest .`, substituting real values for the `<name>` and `<tag>` placeholders shown here.
You can push this image to DockerHub (or elsewhere) if you have an account.

To pull the existing image from DockerHub, use `docker pull mspalti/commons`, or pull your own DockerHub image if you have one.

If all is proper, on the production host you should be able to start the container with this command: `docker run -v /etc/commons-2.0:/etc/commons-2.0 -p 3000:3000`. (Details may vary.) 

It should be possible to preview the container on your development machine if you:

  1. Install and run Tagger-2 on your local machine.
  2. Modify the `src/client/app/environments/environment.prod` file accordingly.
  3. Build the project with `npm run build:prod`
  4. Build the docker image with `docker build -t <name>/<tag>:latest .`
  5. Start the docker image with `docker run -v <home>/etc/commons:/etc/commons-2.0 -p 3000:3000` where `<home>` is your local home directory


## Production Requirements

Session management requires you to provide redis as the session store. The redis port is configurable in credentials.js. (In development, we rely on Passport
sessions. No session store is required.)

## Running Unit Tests

Run `npm run test` to execute unit tests via [Karma](https://karma-runner.github.io) with code coverage.

## Running end-to-end Tests

Run `npm run e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).


## Further Help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
