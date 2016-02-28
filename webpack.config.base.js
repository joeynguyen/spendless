/* eslint strict: 0 */
'use strict';

import path from 'path';

module.exports = {
  module: {
    loaders: [
      {
        test: /\.json$/,
        loader: 'json-loader'
      },
      {
        test: /\.jsx?$/,
        loaders: ['babel-loader'],
        exclude: /node_modules/
      },
    ],

    // noParse: /(lie|pouchdb)\.js$/
    noParse: /lie\.js$|\/leveldown\//

  },
  entry: [
    path.normalize('pouchdb/dist/pouchdb')
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
  },
  resolve: {
    extensions: ['', '.json', '.js', '.jsx'],
  },
  plugins: [

  ],
  externals: [
    // put your node 3rd party libraries which can't be built with webpack here (mysql, mongodb, and so on..)
    {
      // 'pouchdb': 'PouchDB'
    }
  ]
};
