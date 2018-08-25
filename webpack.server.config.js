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

const path = require('path');
const webpack = require('webpack');

function getUserHome() {
  return process.env[(process.platform === 'win32') ? 'USERPROFILE' : 'HOME'];
}

module.exports = env => {

  return {
    entry: {server: './src/server/server.ts'},
    resolve: {
      extensions: ['.js', '.ts'],
      alias: {
        'hiredis': path.join(__dirname, 'src/client/webpack.hacks/hiredis.js'),
        'credentials': (env.development) ? getUserHome() + '/etc/commons-4/credentials.js' :  '/etc/commons-5/credentials.js'
      }
    },
    target: 'node',
    mode: 'none',
    // this makes sure we include node_modules and other 3rd party libraries
    externals: [/node_modules/],
    output: {
      path: path.join(__dirname, './dist'),
      filename: '[name].js'
    },
    module: {
      rules: [{test: /\.ts$/, loader: 'ts-loader'}]
    },
    plugins: [
     // new webpack.NormalModuleReplacementPlugin(/hammerjs/, 'src/client/webpack.hacks/hammerjs.js'),
      // Temporary Fix for issue: https://github.com/angular/angular/issues/11580
      // for 'WARNING Critical dependency: the request of a dependency is an expression'
      new webpack.ContextReplacementPlugin(
        /(.+)?angular(\\|\/)core(.+)?/,
        path.join(__dirname, 'src'), // location of your src
        {} // a map of your routes
      ),
      new webpack.ContextReplacementPlugin(
        /(.+)?express(\\|\/)(.+)?/,
        path.join(__dirname, 'src'),
        {}
      )
    ]
  };
};
