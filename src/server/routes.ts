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
 * Created by mspalti on 8/24/18.
 */

import {join} from 'path';
// Angular Express Engine
import {ngExpressEngine} from '@nguniversal/express-engine';
// Import the map for lazy loading modules.
import {provideModuleMap} from '@nguniversal/module-map-ngfactory-loader';
import * as express from 'express'

export class AppRoutes {

  public static init(app, config, appLogger) {

    // NOTE: must use require() since this file is built Dynamically from webpack
    const {AppServerModuleNgFactory, LAZY_MODULE_MAP} = require('../../dist/server/main');

    // Passport authentication
    app.use(config.authPath, app.ensureAuthenticated);
    // Check for authenticated user.
    app.use(config.authCheck, app.checkAuthentication);

    const DIST_FOLDER = join(process.cwd(), './dist', 'browser');

    // Using Angular Universal.
    app.engine('html', ngExpressEngine({
      bootstrap: AppServerModuleNgFactory,
      providers: [
        provideModuleMap(LAZY_MODULE_MAP)
      ]
    }));

    app.set('view engine', 'html');
    app.set('views', join(DIST_FOLDER));

    const options = {
      dotfiles: 'ignore',
      etag: false,
      extensions: ['js', 'json', 'ico', 'css', 'svg', 'jpg', 'png'],
      index: false,
      redirect: false
    };

    // Serve static files from browser root directory.
    app.use('/commons', express.static(join(DIST_FOLDER), options));

    /**
     * All routes without a file extension return index.html. Since this is
     * a single page application, the only route needed is to the
     * index file.
     */
    app.get('^[^.]+$', (req, res) => {
      res.render(join(DIST_FOLDER, 'index.html'), {req});
    });

    /**
     * This provides basic handling of server errors. Such
     * errors should be rare. Most common errors (e.g. 404) will be
     * handled by the Commons Angular application itself. But in the
     * event, we need to log an error message and return simple error
     * page to the user.
     */
    app.use(function(err, req, res, next) {
      // set locals, only providing error in development
      res.locals.message = err.message;
      res.locals.error = req.app.get('env') === 'development' ? err : {};

      // Add this line to include winston logging to server error.log
      appLogger.getServerLogger()
        .error(`${err.status || 500} - ${err.message} - ${req.method} - ${req.originalUrl} - ${req.ip}`);

      // Render the error page
      res.status(err.status || 500);
      res.sendFile('/serverError.html', {root: DIST_FOLDER});
    });

  }

}
