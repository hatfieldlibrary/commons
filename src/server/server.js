"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Created by mspalti on 3/6/17.
 */
var express = require("express");
var passport = require("passport");
var http = require("http");
var body_parser_1 = require("body-parser");
var environment_1 = require("./config/environment");
var auth_config_1 = require("./config/auth-config");
var routes_1 = require("./config/routes");
var app = express();
// Parsers for POST data
app.use(body_parser_1.json());
app.use(body_parser_1.urlencoded({ extended: false }));
var env = process.env.NODE_ENV || 'development';
var configs = new environment_1.Configuration();
var config = configs.getConfig(env);
var auth = new auth_config_1.Authentication();
auth.init(app, config, passport);
var routes = new routes_1.AppRoutes();
routes.init(app, express);
/**
 * Get port from environment and store in Express.
 */
var port = process.env.PORT || '3000';
app.set('port', port);
/**
 * Create HTTP server.
 */
var server = http.createServer(app);
/**
 * Listen on provided port, on all network interfaces.
 */
server.listen(port, function () { return console.log("Application running on localhost:" + port); });
//# sourceMappingURL=server.js.map