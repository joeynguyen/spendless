import path from 'path';
import webpack from 'webpack';

const env = process.env.NODE_ENV || 'production';
console.log('env', env);

let plugins = [
  new webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: JSON.stringify(env)
    }
  })
];

const loaderOptionsConfig = {
  options: {
    sassLoader: {
      includePaths: [
        './node_modules'
      ]
    }
  }
};

const devConfig = {};
if (env === 'production') {
  loaderOptionsConfig.minimize = true;
  plugins.push(
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
        screw_ie8: true,
        conditionals: true,
        unused: true,
        comparisons: true,
        sequences: true,
        dead_code: true,
        evaluate: true,
        if_return: true,
        join_vars: true,
      },
      mangle: {
        screw_ie8: true
      },
      output: {
        comments: false,
        screw_ie8: true
      }
    })
  );
} else {
  plugins = plugins.concat([
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin()
  ]);
  devConfig.devtool = 'cheap-module-source-map';
  devConfig.entry = [
    'webpack-hot-middleware/client?path=http://localhost:3000/__webpack_hmr',
    './src/index.js'
  ];
  devConfig.output = {
    path: path.resolve('./dist'),
    filename: 'bundle.js',
    publicPath: 'http://localhost:3000/dist/'
  };
  devConfig.devServer = {
    compress: true,
    clientLogLevel: 'none',
    contentBase: path.resolve('./dist'),
    // publicPath: '/',
    publicPath: 'http://localhost:3000/dist/',
    libraryTarget: 'commonjs2',
    quiet: true,
    hot: true,
    watchOptions: {
      ignored: /node_modules/
    },
    historyApiFallback: true,
    // proxy: {
    //   '/api/*': 'http://localhost:8102'
    // },
    target: 'electron-renderer'
  };
}

plugins.push(
  new webpack.LoaderOptionsPlugin(loaderOptionsConfig),
);

const exportedObj = Object.assign({
  entry: './src/index.js',
  output: {
    path: path.resolve('./dist'),
    filename: 'bundle.js',
    publicPath: '/'
    // publicPath: 'http://localhost:3000/dist/',
  },
  resolve: {
    extensions: ['.js', '.jsx', '.scss', '.css', '.json']
  },
  plugins,
  node: {
    fs: 'empty',
    net: 'empty',
    tls: 'empty'
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: 'babel-loader'
      },
      {
        test: /\.json$/,
        use: 'json-loader'
      },
      {
        test: /^((?!\.module).)*\.css$/,
        use: [
          'style-loader',
          'css-loader'
        ]
      }, {
        test: /\.module\.css$/,
        use: [
          'style-loader',
          'css-loader?sourceMap'
        ]
      },
      {
        test: /\.scss$/,
        use: [
          { loader: 'file-loader', options: { name: '[name].css' } },
          { loader: 'sass-loader',
            options: {
              outputStyle: 'compressed',
              includePaths: [
                './node_modules'
              ]
            }
          }
        ]
      }
    ]
  },
  externals: [
    // put your node 3rd party libraries which can't be built with webpack here (mysql, mongodb, and so on..)
    {
      'pouchdb': 'PouchDB'
    }
  ]
}, devConfig);

console.log('devConfig', devConfig);
console.log('exportedObj', exportedObj);

export default exportedObj;
