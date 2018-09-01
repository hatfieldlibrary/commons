c# Commons
[![Build Status](https://travis-ci.org/hatfieldlibrary/commons.svg?branch=master)](https://travis-ci.org/hatfieldlibrary/commons)
[![Coverage Status](https://coveralls.io/repos/github/hatfieldlibrary/commons/badge.svg?branch=master)](https://coveralls.io/github/hatfieldlibrary/commons?branch=master)

The Commons is designed to publish information about digital projects and collections that are maintained within institutional repositories like DSpace, Contentdm, and Hydra or
 that exist independently as unique, standalone projects like Omeka exhibits and public websites. The Commons provides integration with 
 repository services through shared authentication and authorization and targeted search capability.  

The project uses [Angular](https://angular.io/), [ngrx](https://github.com/ngrx), and [Angular Material](https://material.angular.io/).
The [Angular-CLI](https://cli.angular.io/) and WebPack are used to develop, test, and build. The project is configured to support server-side rendering using 
[Angular Universal](https://angular.io/guide/universal) with [Node.js](https://nodejs.org/en/) and [Express](https://expressjs.com/).
Client and server code is written in Typescript. 

The Commons relies on the [Tagger-2](https://github.com/hatfieldlibrary/tagger-2) public API for data.  The Commons is integrated with the [dspace-client project](https://github.com/hatfieldlibrary/dspace-angular-client) for single sign on and automatic login. 
 [Passport](http://passportjs.org/) middleware is used for CAS authentication. (Other authentication services can be used by installing and configuring the required Passport authentication strategy. See `server/config/auth-config.ts`). Authentication 
 requires information provided in separate credentials.js files (described below). 
 
 [Redis](https://redis.io/) is used as the session store and is required by the production environment.
 
 |              | Version
 |-------------	|:-------:
 | Angular     	| 6.1.4 	
 | Angular CLI 	| 6.1.4 		
 | ngrx        	| 6.0.1 	
 | rxjs        	| 6.2.2 	

## Configuration 

The Commons is designed to use with the Tagger-2 REST API. You will need that project running with a production or development
server before starting.  

For server deployment you need to create two configuration files in your home directory (Mac or Windows): 
`~/etc/commons-dev/credentials.js` and `~/etc/commons-prod/credentials.js`. Edit the files to provide the following information as appropriate for your development and production environments: 

```javascript
'use strict';

var credentials = {

  apiHost: 'your sever base url and port (if necessary).  e.g. http://localhost:3005',
  serverBaseURL: 'the url expected by your CAS server, including port (this is not provided by the current CAS strategy implementation',
  ssoBaseURL:' url of your CAS server',
  validateURL: 'path to validation service',
  domain: 'your domain, e.g. mycampus.edu',
  redisPort: 6370 // unused in development, production only

};

module.exports = credentials;
```

In the client, the [Angular CLI is configured to recognize development, test and production environments](https://github.com/angular/angular-cli/blob/master/docs/documentation/stories/application-environments.md) and replace configuration files as needed. Use these files to configure the client application.

### Development

To work on the Commons client without Universal server-side rendering, use `npm run start:dev`.  

To work with server-side rendering in development mode, use `npm run build:development:ssr` and `npm run serve:ssr`.

### Tests

For unit tests, use `npm run test`.

### Production

To build for production, use `npm run build:development:ssr` and copy the resulting `./dist` directory to the production host.

## Production Requirements

Session management requires Redis for use as the session store. The redis port is configurable in credentials.js. 

(In development we rely on Passport sessions and therefore no session store is needed. But you might not be able to test
 authentication logic in Universal mode.)

### Docker

(Needs update)

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
  5. Start the docker image with `docker run -v <home>/etc/commons:/etc/commons-2.0 -p 3000:3000` where `<home>` is your local home directory.


## Further Help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
