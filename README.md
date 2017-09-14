# Commons
[![Build Status](https://travis-ci.org/hatfieldlibrary/commons.svg?branch=master)](https://travis-ci.org/hatfieldlibrary/commons)
[![Coverage Status](https://coveralls.io/repos/github/hatfieldlibrary/commons/badge.svg?branch=master)](https://coveralls.io/github/hatfieldlibrary/commons?branch=master)
[![bitHound Overall Score](https://www.bithound.io/github/hatfieldlibrary/commons/badges/score.svg)](https://www.bithound.io/github/hatfieldlibrary/commons)
[![bitHound Dependencies](https://www.bithound.io/github/hatfieldlibrary/commons/badges/dependencies.svg)](https://www.bithound.io/github/hatfieldlibrary/commons/master/dependencies/npm)
[![bitHound Code](https://www.bithound.io/github/hatfieldlibrary/commons/badges/code.svg)](https://www.bithound.io/github/hatfieldlibrary/commons)

The Commons is designed to publish information about digital projects and collections maintained within institutional repositories like DSpace, Contentdm, and Hydra or
 existing independently as unique, standalone projects like Omeka exhibits and public websites created by members of a community.

The Commons relies on the [Tagger-2](https://github.com/hatfieldlibrary/tagger-2) public API for data.  The Commons is loosely integrated with the [dspace-client project](https://github.com/hatfieldlibrary/dspace-angular-client) (a public DSpace client that works with a 
 modified version of the DSpace 6 REST API servlet). [Passport](http://passportjs.org/) middleware authentication is available for CAS and Google OAUTH2 strategies.

The project uses [Angular](https://angular.io/), [ngrx](https://github.com/ngrx), and [Angular Material](https://material.angular.io/).
The [Angular-CLI](https://cli.angular.io/) is used to develop, test and build. The  project is published within a [Node.js](https://nodejs.org/en/) server
 runtime using [Express](https://expressjs.com/) middleware.
Both client and server code is written in Typescript. 
## Development server

### Via angular-cli
Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

### Via npm script
Run `npm run start:dev` to start the dev serve using npm. This will use the copy of angular-cli included in the project.  You should not need to have angular-cli installed globally. (Let me know if you find that isn't true!)

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive/pipe/service/class/module`.

## Build

Run `npm run build:prod`. The build artifacts will be stored in the `dist/` directory. This script will build using the `--prod` and `--aot` flags.

## Running unit tests

### Via angular-cli
Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

### Via npm script
Run `npm run test` to execute unit tests with code coverage.

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).
Before running the tests make sure you are serving the app via `ng serve`.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
