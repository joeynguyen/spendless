import path from 'path';
import webpack from 'webpack';

const env = process.env.NODE_ENV || 'production';
console.log('env', env);

let plugins = [
  new webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: JSON.stringify(env)
    },
    'global.GENTLY': false
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
  devConfig.target = 'electron-renderer';
  devConfig.entry = [
    'react-hot-loader/patch',
    `webpack-dev-server/client?http://localhost:8080/`,
    'webpack/hot/only-dev-server',
    './src/index.js'
  ];
  devConfig.output = {
    path: path.resolve('./dist'),
    filename: 'bundle.js',
    publicPath: 'http://localhost:8080/dist/'
  };
  devConfig.devServer = {
    compress: true,
    clientLogLevel: 'none',
    contentBase: path.resolve('./dist'),
    // publicPath: '/',
    publicPath: 'http://localhost:8080/dist/',
    // libraryTarget: 'commonjs2',
    quiet: true,
    hot: true,
    watchOptions: {
      ignored: /node_modules/
    },
    historyApiFallback: true,
    // proxy: {
    //   '/api/*': 'http://localhost:8102'
    // },
  };
}

plugins.push(
  new webpack.LoaderOptionsPlugin(loaderOptionsConfig),
);

export default Object.assign({
  entry: './src/index.js',
  output: {
    path: path.resolve('./dist'),
    filename: 'bundle.js',
    publicPath: '/'
    // publicPath: 'http://localhost:8080/dist/',
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
        // use: [
        //   {
        //     loader: 'babel-loader',
        //     options: {
        //       presets: ['es2015', 'stage-0', 'react']
        //     }
        //   }
        // ],
      }, {
        test: /\.json$/,
        use: 'json-loader'
      }, {
        test: /^((?!\.module).)*\.css$/,
        use: [
          'style-loader',
          'css-loader'
        ]
      }, {
        test: /\.module\.css$/,
        use: [
          'style-loader',
          'css-loader?sourceMap&modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!'
        ]
      }, {
        test: /\.scss$/,
        use: [
          { loader: 'style-loader' },
          { loader: 'css-loader' },
          { loader: 'sass-loader',
            options: {
              outputStyle: 'compressed',
              includePaths: [ './node_modules' ]
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
