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

export const environment = {
  production: true,
  // REST API host. This path will typically be an empty string in production.
  // Defining a host is useful in development since it allows us to access
  // the rest API on the production host.
  apiHost: '',
  // Base path, do not include beginning forward slash.
  appRoot: 'commons',
  // Path to the REST API (using proxy path)
  apiRoot: '/commons-rest',
  // Path to images (using proxy path)
  imagePath: '/commons-images',
  // Authentication paths (using proxy path)
  authPath: '/commons-auth',
  authCheck: '/commons-check'
};
