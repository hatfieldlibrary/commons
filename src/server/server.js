/**
 * Created by mspalti on 3/6/17.
 */
"use strict";
var express = require('express');
var path = require('path');
var http = require('http');
var body_parser_1 = require('body-parser');
var environment_1 = require('./config/environment');
var app = express();
// Parsers for POST data
app.use(body_parser_1.json());
app.use(body_parser_1.urlencoded({ extended: false }));
var env = process.env.NODE_ENV || 'development';
var configs = new environment_1.Configuration();
var config = configs.getConfig(env);
// Point static path to dist
app.use(express.static(path.join(__dirname, '../../dist')));
// Catch all other routes and return the index file
app.get('*', function (req, res) {
    res.sendFile(path.join(__dirname, '../../dist/index.html'));
});
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
server.listen(port, function () { return console.log("API running on localhost:" + port); });
//# sourceMappingURL=server.js.map