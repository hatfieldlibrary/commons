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
  const devDirectory = getUserHome() + '/etc/commons/';
  // Home of the production credentials file.
  const prodDirectory =  '/etc/commons/';

  const path = {
    development: devDirectory,
    test: devDirectory,
    production: prodDirectory
  };

  function _getPath(env) {
    return path[env];
  }

  const creds = {

    path: _getPath

  };

  module.exports = creds;

})();
