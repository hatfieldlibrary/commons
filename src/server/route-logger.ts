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
export class WinstonLogger {

  logger: Logger;

  options = {

    file: {
      level: 'info',
      filename: '/var/log/commons/app.log',
      handleExceptions: true,
      json: true,
      maxsize: 5242880, // 5MB
      maxFiles: 5,
      colorize: false,
    },
    console: {
      level: 'debug',
      handleExceptions: true,
      json: false,
      colorize: true,
    }

  };

  constructor() {
  }

  public init(app: any): void {
    // noinspection TypeScriptValidateTypes
    this.logger = createLogger({
      transports: [
        new transports.File(this.options.file),
        new transports.Console(this.options.console)
      ],
      exitOnError: false, // do not exit on handled exceptions
    });

    app.use(morgan('combined', {
        'stream': {
          write: (message: string) =>
            this.logger.info(message.trim())
        }
      })
    );
  }

}

