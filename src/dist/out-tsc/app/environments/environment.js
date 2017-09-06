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
// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `angular-cli.json`.
export var environment = {
    production: false,
    // REST API host.
    apiHost: 'http://libmedia.willamette.edu',
    // Base path, do not include beginning forward slash.
    appRoot: 'commons',
    // Path to the REST API.
    apiRoot: '/commons-rest',
    // Path to images.
    imagePath: '/commons-images',
    // Authentication paths.
    authPath: '/auth',
    authCheck: '/check'
};
//# sourceMappingURL=/Users/mspalti/willamette/commons/commons-6.28.17/src/client/app/environments/environment.js.map