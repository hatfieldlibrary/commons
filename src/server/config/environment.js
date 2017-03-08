/**
 * Created by mspalti on 3/6/17.
 */
'use strict';
var env = process.env.NODE_ENV || 'development';
var credentials;
var credentialsPath = require('./require-paths');
try {
    // The path to credentials.
    credentials = require(credentialsPath.path(env) + 'credentials');
}
catch (ex) {
    // No credentials ... try travis-ci credentials.
    console.log('Using travis credentials');
    credentials = require('../credentials/travis-credentials');
}
var Configuration = (function () {
    function Configuration() {
        this.config = {
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
    }
    Configuration.prototype.getConfig = function (s) {
        console.log('estigler');
        return this.config[s];
    };
    return Configuration;
}());
exports.Configuration = Configuration;
//# sourceMappingURL=environment.js.map