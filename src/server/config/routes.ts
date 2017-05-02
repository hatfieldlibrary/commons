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
 * Created by mspalti on 4/26/17.
 */

import * as path from 'path';

const authentication = require('../controllers/authentication');

export class AppRoutes {

  public constructor() {}

  public init(app, express) {

    // Point static path to dist
    app.use(express.static(path.join(__dirname, '../../../dist')));

    // Requires authentication and authentication controller.
    app.use('/auth', app.ensureAuthenticated);

    app.use('/authCheck', app.checkAuthentication);

   // Catch all other routes and return the index file
    app.get('*', function (req, res) {
      res.sendFile(path.join(__dirname, '../../../dist/index.html'));

    });

  }

}
