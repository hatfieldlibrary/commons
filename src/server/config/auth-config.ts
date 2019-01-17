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
  // cas = require('passport-cas'),
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

    /**
     * For development purposes, we use express-session in lieu of Redisstore.
     */
    if (config.nodeEnv === 'development') {
      app.use(session({
          secret: 'keyboard cat',
          saveUninitialized: true,
          resave: true
        })
      );
      /**
       * Use redis as the production session store.
       *  http://redis.io/
       */
    } else if (config.nodeEnv === 'production') {
      const redisPort = config.redisPort || 6379;
      const client = redis.createClient(
        redisPort, '127.0.0.1',
        {}
      );
      app.use(cookieParser());
      app.use(session(
        {
          secret: 'insideoutorupagain',
          store: new RedisStore({host: '127.0.0.1', port: redisPort, client: client}),
          saveUninitialized: false, // don't create session until something stored,
          resave: false // don't save session if unmodified
        }
      ));
    }

    /**
     * Set up authentication and session.
     */
    app.use(passport.initialize());
    app.use(passport.session());

    /**
     * Define serializer and deserializer. Used to
     * store uid in the session.
     */
    passport.serializeUser(function (user, done) {
      done(null, user.uid);
    });
    passport.deserializeUser(function (user, done) {
      done(null, user);
    });


    /**
     * Class for validating the user.
     */
    const User = {

      findOne: function (profile, callback) {
        if (typeof profile === 'undefined') {
          return callback(new Error('User is undefined'), '');
        }
        return callback(null, profile.login);
      }
    };

    /**
     * The CAS authentication strategy.  The callback method just checks to be sure that
     * a user was returned.  The user object contains email and uid.
     *
     * CAS configuration is defined in the credentials file.
     *
     *
     * The insecure library is used for saml requests.
     *
     * Although there is probably no risk even when using saml, it's a still good idea to manually update the
     * package.json for this module. The issue has been reported via a pull request and the module author has not
     * responded.
     *
     * Update node_modules/passport-cas/package.json: "node-uuid": "1.4.1", -> "node-uuid": "1.4.4"
     *
     * Details: A bug in node-uuid prior to 1.4.4 caused it to use the cryptographically insecure Math.random which can
     * produce predictable values and should not be used in security-sensitive context.
     */
    /* TODO: This npm package includes an insecure dependency. No risk, but it triggers a npm audit warning. */
    const casStrategy = require('passport-cas');

    passport.use(new (casStrategy.Strategy)({
      version: 'CAS3.0',
      ssoBaseURL: config.ssoBaseURL,
      serverBaseURL: config.serverBaseURL,
      validateURL: config.validateURL
    }, function (profile, done) {

      User.findOne({login: profile.attributes}, function (err, user) {

        if (err) {
          return done(err);
        }
        if (!user) {
          return done(null, false, {message: 'Unknown user'});
        }

        return done(null, user);
      });

    }));
    /**
     * Previously we were able to use passport-cas2.  It now seems to handle the
     * redirect and ticket but the callback function is not invoked.
     */
    // const CasStrategy = require('passport-cas2').Strategy;
    //
    // passport.use(new CasStrategy({
    //     casURL: config.ssoBaseURL
    //   },
    //   // This is the `verify` callback
    //   function (username, profile, done) {
    //     console.log('in callback')
    //     User.findOne({login: profile}, function (err, user) {
    //       done(err, user);
    //     });
    //   }));

    /**
     * Checks whether the request is authenticated and returns boolean.
     * Angular 2 routes do not natively play well with session cookies.
     * Third-party middleware is not yet suited to our needs.  And Passport CAS
     * authentication, probably requires us to check with
     * the server in any case to determine whether the session has been assigned a user.
     * This API endpoint allows the client to quickly determine authentication status
     * and update the UI accordingly.
     *
     * Here's the sequence in our current Academic Commons implementation.  This same strategy
     * can be used elsewhere if the client needs to know its authentication status.
     *
     * 1. Passport is configured to use sessions and store uid in the current session.
     * 2. The CAS auth strategy completes successful authentication and redirects to the requested page.
     * 3. An angular app uses this endpoint to check whether the user has been authenticated.
     * 4. If the function returns true for an existing user, the angular component will not call this endpoint again.
     * 5. If the function returns false, the angular component will check again at onInit.
     *
     * This is how we know whether to enable links and search forms in the Academic Commons ItemLinksComponent.
     *
     * @param req
     * @param res
     */
    app.checkAuthentication = function (req, res) {
      if (req.user) {
        res.end(JSON.stringify({auth: true}))
      } else {
        res.end(JSON.stringify({auth: false}))
      }
    };


    /**
     * Route middleware ensures user is authenticated.
     * Use this middleware on any resource that needs to be protected.  If
     * the request is authenticated (typically via a persistent login session),
     * the request will proceed.  Otherwise, the user will be redirected to the
     * login page.
     *
     * Request paths must begin with the 'auth/' root. The remainder of the path
     * must be the resource being requested.  For example, 'auth/file/one' will be
     * redirected to 'file/one' in the CAS passport authenticate callback method.
     * */
    app.ensureAuthenticated = function (req, res, next) {

      // Get the auth path prefix from configuration.
      const find = config.authPath;
      const path = req.originalUrl;

      console.log(config.authPath);
      // Removes the auth path prefix from the current path.
      const redirect = '/commons/' + path.replace(find, '');

      passport.authenticate('cas', (err, user, info) => {

        console.log('user ' + user);
        if (err) {
          return next(err);
        }

        if (!user) {

          req.session.messages = info.message;
          return res.redirect(redirect);
        }

        req.logIn(user, function (error) {

          if (error) {
            return next(error);
          }

          req.session.messages = '';
          // Redirect to the requested item.
          return res.redirect(redirect);

        });
      })(req, res, next);
    };

  };

}
