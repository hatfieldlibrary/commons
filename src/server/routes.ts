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

// import * as path from 'path';
import {join} from 'path';
// Express Engine
import {ngExpressEngine} from '@nguniversal/express-engine';
// Import module map for lazy loading
import {provideModuleMap} from '@nguniversal/module-map-ngfactory-loader';

export class AppRoutes {

  public static init(app, express, config) {

    // * NOTE :: leave this as require() since this file is built Dynamically from webpack
    const {AppServerModuleNgFactory, LAZY_MODULE_MAP} = require('../../dist/server/main');

    // Passport authentication
    app.use(config.authPath, app.ensureAuthenticated);
    // Check for authenticated user.
    app.use(config.authCheck, app.checkAuthentication);

    const DIST_FOLDER = join(process.cwd(), './dist');

    app.engine('html', ngExpressEngine({
      bootstrap: AppServerModuleNgFactory,
      providers: [
        provideModuleMap(LAZY_MODULE_MAP)
      ]
    }));

    app.set('view engine', 'html');
    app.set('views', join(DIST_FOLDER, 'browser'));

    // Server static files from /browser
    app.get('*.*', express.static(join(DIST_FOLDER, 'browser')));

    // All regular routes use the Universal engine
    app.get('*', (req, res) => {
      res.render('index', {req});
    });

  }

}
