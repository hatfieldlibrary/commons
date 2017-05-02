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
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Created by mspalti on 4/26/17.
 */
var 
/**
 * Express session store
 * @type {session|exports|module.exports}
 */
session = require('express-session'), 
/**
 * cookie header parser used with sessions
 * @type {*|exports|module.exports}
 */
cookieParser = require('cookie-parser'), 
/**
 * CAS authentication strategy
 */
//cas = require('passport-cas'),
/**
 * Redis client
 * @type {exports|module.exports}
 */
redis = require('redis'), 
/**
 * Redis session store
 */
RedisStore = require('connect-redis')(session);
var Authentication = (function () {
    function Authentication() {
    }
    Authentication.prototype.init = function (app, config, passport) {
        // let credentials = environment.getConfig(app.get('env'));
        //  console.log('init')
        //  console.log(credentials)
        // For development purposes, use express-session in lieu of Redisstore.
        if (app.get('env') === 'development' || app.get('env') === 'runlocal') {
            app.use(session({
                secret: 'keyboard cat',
                saveUninitialized: true,
                resave: true
            }));
            // Use redis as the production session store.
            // http://redis.io/
        }
        else if (app.get('env') === 'production') {
            var redport = config.redisPort || 6379;
            var client = redis.createClient(redport, '127.0.0.1', {});
            app.use(cookieParser());
            app.use(session({
                secret: 'insideoutorup',
                store: new RedisStore({ host: '127.0.0.1', port: config.redisPort, client: client }),
                saveUninitialized: false,
                resave: false // don't save session if unmodified
            }));
        }
        // Set up authentication and session.
        app.use(passport.initialize());
        app.use(passport.session());
        // define serializer and deserializer
        passport.serializeUser(function (user, done) {
            done(null, user);
        });
        passport.deserializeUser(function (user, done) {
            done(null, user);
        });
        /**
         * Validates CAS user.  Not much to do at this point. Just
         * make sure we have a user and return.
         */
        var User = {
            findOne: function (login, callback) {
                if (typeof login === 'undefined') {
                    return callback(new Error('User is undefined'), '');
                }
                return callback(null, login.username);
            }
        };
        /**
         * CAS authentication strategy
         */
        var casStrategy = require('passport-cas');
        passport.use(new (casStrategy.Strategy)({
            version: 'CAS3.0',
            ssoBaseURL: config.ssoBaseURL,
            serverBaseURL: config.serverBaseURL,
            validateURL: config.validateURL
        }, function (profile, done) {
            User.findOne({ login: profile.user }, function (err, user) {
                if (err) {
                    return done(err);
                }
                if (!user) {
                    return done(null, false, { message: 'Unknown user' });
                }
                return done(null, user);
            });
        }));
        /**
         * Checks whether the request is authenticated and returns boolean.
         * Angular 2 routes do not natively play well with session cookies.
         * And third-party middleware is not yet suited to our needs.  This API
         * endpoint allows the client to quickly determine authentication status
         * and update the UI accordingly. Used only by ItemLinksComponent.
         *
         * Yes, it's lame.
         *
         * @param req
         * @param res
         */
        app.checkAuthentication = function (req, res) {
            res.setHeader('Content-Type', 'application/json');
            res.setHeader('Access-Control-Allow-Origin', '*');
            if (req.headers.cookie.indexOf('connect.sid') !== -1) {
                res.end(JSON.stringify({ auth: true }));
            }
            else {
                res.end(JSON.stringify({ auth: false }));
            }
        };
        /**
         * Route middleware ensures user is authenticated.
         * Use this middleware on any resource that needs to be protected.  If
         * the request is authenticated (typically via a persistent login session),
         * the request will proceed.  Otherwise, the user will be redirected to the
         * login page. */
        app.ensureAuthenticated = function (req, res, next) {
            var find = 'auth/';
            var path = req._parsedOriginalUrl.pathname;
            var redirect = path.replace(find, '');
            passport.authenticate('cas', function (err, user, info) {
                if (err) {
                    return next(err);
                }
                if (!user) {
                    req.session.messages = info.message;
                    return res.redirect(redirect);
                }
                req.logIn(user, function (err) {
                    if (err) {
                        return next(err);
                    }
                    req.session.messages = '';
                    return res.redirect(redirect);
                });
            })(req, res, next);
        };
    };
    ;
    return Authentication;
}());
exports.Authentication = Authentication;
//# sourceMappingURL=auth-config.js.map