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
'use strict';
(function () {
    // User's home directory. Should be OS agnostic.
    function getUserHome() {
        return process.env[(process.platform === 'win32') ? 'USERPROFILE' : 'HOME'];
    }
    // Home of the development/test credentials file.
    var devDirectory = getUserHome() + '/etc/commons/';
    // Home of the production credentials file.
    var prodDirectory = '/etc/commons-2.0/';
    var path = {
        development: devDirectory,
        test: devDirectory,
        production: prodDirectory
    };
    function _getPath(env) {
        return path[env];
    }
    var creds = {
        path: _getPath
    };
    module.exports = creds;
})();
//# sourceMappingURL=require-paths.js.map