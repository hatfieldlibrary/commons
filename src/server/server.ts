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
// These are important and needed before anything else
import 'zone.js/dist/zone-node';
import 'reflect-metadata';

import * as express from 'express'
import * as passport from 'passport';
import { json, urlencoded } from 'body-parser';
import {Configuration} from './config/environment';
import {Authentication} from './config/auth-config';
import {AppRoutes} from './routes';
import * as helmet from 'helmet';
import {enableProdMode} from '@angular/core';

enableProdMode();

const app = express();

// Parsers for POST data
app.use(json());
app.use(urlencoded({ extended: false }));

// Using default settings. See https://github.com/helmetjs/helmet
app.use(helmet());

const env = process.env.HOST_ENV || 'development';
console.log('a')
console.log(env)
const configs: Configuration = new Configuration(env);
console.log('b')
const config = configs.getConfig();
console.log('c')
const auth = new Authentication();
console.log('d')
console.log(config)
auth.init(app, config, passport);
console.log('e')



// const routes = new AppRoutes();
AppRoutes.init(app, express, config);

// Faster server renders w/ Prod mode (dev mode never needed)

console.log('f')
/**
 * Get port from environment and store in Express.
 */
const port = process.env.PORT || 3005;
app.set('port', port);

import * as http from 'http';

// const DIST_FOLDER = join(process.cwd(), '../dist');
// console.log('g')
//
// // * NOTE :: leave this as require() since this file is built Dynamically from webpack
// const { AppServerModuleNgFactory, LAZY_MODULE_MAP } = require('../../dist/server/main');
// console.log('h')
// // Express Engine
// import { ngExpressEngine } from '@nguniversal/express-engine';
// // Import module map for lazy loading
// import { provideModuleMap } from '@nguniversal/module-map-ngfactory-loader';
// import * as http from 'http';
//
// app.engine('html', ngExpressEngine({
//   bootstrap: AppServerModuleNgFactory,
//   providers: [
//     provideModuleMap(LAZY_MODULE_MAP)
//   ]
// }));
//
// app.set('view engine', 'html');
// app.set('views', join(DIST_FOLDER, 'browser'));
//
// // Server static files from /browser
// app.get('*.*', express.static(join(DIST_FOLDER, 'browser')));
//
// // All regular routes use the Universal engine
// app.get('*', (req, res) => {
//   res.render('index', { req });
// });

/**
 * Create HTTP server.
 */
 const server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */
 server.listen( port, () => console.log(`Application running on localhost:${port}`));
// app.listen( port, () => console.log(`Application running on localhost:${port}`));
