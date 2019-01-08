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

import {createLogger, Logger, transports, format} from 'winston';
import * as DailyRotateFile from 'winston-daily-rotate-file';
const { combine } = format;
import * as morgan from 'morgan';
import * as fs from 'fs';

/**
 * This module configures Winston logging for
 * an access log (using Morgan) and an error log.
 */
export class ApplicationLogger {

  logDir = '/var/log/commons';

  options = {

    access: {
      level: 'info',
      filename: `${this.logDir}/access-%DATE%.log`,
      datePattern: 'YYYY-MM-DD',
      maxFiles: '14d',
      zippedArchive: true,
      handleExceptions: true,
      json: false,
      format: combine(format.timestamp({
          format: 'YYYY-MM-DD HH:mm:ss'
        }),
        format.printf(info => `${info.level}: ${info.message}`))
    },
    error: {
      level: 'error',
      filename: `${this.logDir}/error-%DATE%.log`,
      datePattern: 'YYYY-MM',
      maxFiles: '10',
      zippedArchive: true,
      handleExceptions: true,
      json: false,
      format: combine(format.timestamp({
          format: 'YYYY-MM-DD HH:mm:ss'
        }),
        format.printf(info => `${info.timestamp} ${info.level}: ${info.message}`))
    },
    console: {
      level: 'debug',
      handleExceptions: true,
      json: false,
      colorize: true,
    }

  };

  errorLogger: Logger;

  logger: Logger;

  constructor() {
  }

  /**
   * Initializes the Winston logger and adds Morgan logging
   * for all http requests.
   * @param app the express application
   */
  public init(app: any): void {

    // Create the log directory if it does not exist
    if (!fs.existsSync(this.logDir)) {
      fs.mkdirSync(this.logDir);
    }

    /**
     * Defines the logger used for errors (e.g. 500).
     */
    this.errorLogger = createLogger({
      transports: [
        new DailyRotateFile(this.options.error),
        new transports.Console(this.options.console)
      ],
      exitOnError: false, // do not exit on handled exceptions)
    });

    this.errorLogger.on('error', (err) => {
      console.log(err) // The logger itself can emit errors. Handle these here with simple console log.
    });

    /**
     * Defines the access log used by Morgan.
     */
    this.logger = createLogger({
      transports: [
        new DailyRotateFile(this.options.access)
      ],
      exitOnError: false, // do not exit on handled exceptions
    });

    this.logger.on('error', (err) => {
      console.log(err) // The logger itself can emit errors. Handle these here with simple console log.
    });

    /**
     * Configure the Express app to use Morgan and the Winston logger for the access log.
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
   * routes.ts.
   */
  public getServerLogger(): Logger {
    return this.errorLogger;
  }


}

