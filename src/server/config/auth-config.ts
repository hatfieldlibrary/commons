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
 * Created by mspalti on 4/26/17.
 */

const
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
  cas = require('passport-cas2'),
  /**
   * Redis client
   * @type {exports|module.exports}
   */
  redis = require('redis'),
  /**
   * Redis session store
   */
  RedisStore = require('connect-redis')(session);


export class Authentication {

  constructor() {
  }

  public init(app, config, passport) {

    // let credentials = environment.getConfig(app.get('env'));
    //  console.log('init')
    //  console.log(credentials)

    // For development purposes, use express-session in lieu of Redisstore.
    if (app.get('env') === 'development' || app.get('env') === 'runlocal') {
      app.use(session({
          secret: 'keyboard cat',
          saveUninitialized: true,
          resave: true
        })
      );
      // Use redis as the production session store.
      // http://redis.io/
    } else if (app.get('env') === 'production') {

      const redport = config.redisPort || 6379;
      let client = redis.createClient(
        redport, '127.0.0.1',
        {}
      );
      app.use(cookieParser());
      app.use(session(
        {
          secret: 'insideoutorup',
          store: new RedisStore({host: '127.0.0.1', port: config.redisPort, client: client}),
          saveUninitialized: false, // don't create session until something stored,
          resave: false // don't save session if unmodified
        }
      ));
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
    let User = {

      validate: function (user, callback) {

        if (typeof user === 'undefined') {
          return callback(new Error('User is undefined'), '');
        }

        return callback(null, user.username);

      }
    };

    /**
     * CAS authentication strategy
     */
    let CasStrategy = require('passport-cas2').Strategy;

    passport.use(new CasStrategy({
        casURL: config.authUrl
      },
      // This is the `verify` callback
      function (username, profile, done) {
        User.validate({username: username}, function (err, user) {
          done(err, user);
        });
      }));


    /**
     * Route middleware ensures user is authenticated.
     * Use this middleware on any resource that needs to be protected.  If
     * the request is authenticated (typically via a persistent login session),
     * the request will proceed.  Otherwise, the user will be redirected to the
     * login page. */
    app.ensureAuthenticated = function (req, res, next) {

      let find = 'auth/';
      let path = req._parsedOriginalUrl.pathname;
      let redirect = path.replace(find, '');

      if (req.isAuthenticated()) {
        return res.redirect(redirect);
      }

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
}
