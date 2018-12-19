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

import {createLogger, Logger, transports} from 'winston';
import * as morgan from 'morgan';

/**
 * This module configures winston logging and configures
 * the application to consolidate winston logging with
 * http logging.
 */
export class ApplicationLogger {

  options = {

    access: {
      level: 'info',
      filename: '/var/log/commons/access.log',
      handleExceptions: true,
      json: false,
      colorize: false,
    },
    error: {
      level: 'error',
      filename: '/var/log/commons/error.log',
    },
    console: {
      level: 'debug',
      handleExceptions: true,
      json: false,
      colorize: true,
    }

  };

  serverLogger: Logger = createLogger({
    transports: [
      new transports.File(this.options.error),
    ],
    exitOnError: false, // do not exit on handled exceptions)
  });

  logger: Logger;

  constructor() {
  }

  /**
   * Initializes the Winston logger and adds Morgan logging
   * for all http requests.
   * @param app the express application
   */
  public init(app: any): void {

    // noinspection TypeScriptValidateTypes
    this.logger = createLogger({
      transports: [
        new transports.File(this.options.access),
      ],
      exitOnError: false, // do not exit on handled exceptions
    });

    this.logger.on('error', (err) => {
      console.log(err) // The logger itself can emit errors. Handle these here with simple console log.
    });

    /**
     * Configure the Express app to use Morgan and log requests using the
     * Winston logger.
     */
    app.use(morgan('common', {
        'stream': {
          write: (message: string) =>
            this.logger.info(message.trim())
        }
      })
    );
  }

  /**
   * Returns the Winston error logger. This can
   * be used for Express error messages. See usage in
   * routes.js.
   */
  public getServerLogger(): Logger {
    return this.serverLogger;
  }


}

