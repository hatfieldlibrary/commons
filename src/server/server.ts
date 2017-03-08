/**
 * Created by mspalti on 3/6/17.
 */

import * as express from 'express'
import * as path from 'path';
import * as http from 'http';
import { json, urlencoded } from 'body-parser';
import {Configuration} from './config/environment';

const app = express();

// Parsers for POST data
app.use(json());
app.use(urlencoded({ extended: false }));

const env = process.env.NODE_ENV || 'development';

const configs: any = new Configuration();
const config = configs.getConfig(env);

// Point static path to dist
app.use(express.static(path.join(__dirname, '../../dist')));


// Catch all other routes and return the index file
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../../dist/index.html'));
});

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
server.listen(port, () => console.log(`API running on localhost:${port}`));
