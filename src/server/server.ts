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
 * Created by mspalti on 3/6/17.
 */

import * as express from 'express'
import * as passport from 'passport';
import * as http from 'http';
import { json, urlencoded } from 'body-parser';
import {Configuration} from './config/environment';
import {Authentication} from './config/auth-config';
import {AppRoutes} from "./config/routes";

const app = express();

// Parsers for POST data
app.use(json());
app.use(urlencoded({ extended: false }));

const env = process.env.NODE_ENV || 'development';

const configs: any = new Configuration();
const config = configs.getConfig(env);

const auth = new Authentication();
auth.init(app, config, passport);

const routes = new AppRoutes();
routes.init(app, express, config);

/**
 * Get port from environment and store in Express.
 */
const port = process.env.PORT || '3000';
app.set('port', port);

/**
 * Create HTTP server.
 */
const server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */
server.listen(port, () => console.log(`Application running on localhost:${port}`));
