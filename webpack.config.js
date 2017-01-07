var webpack = require('webpack');

var definePlugin = new webpack.DefinePlugin({
  __DEV__: (process.env.NODE_ENV === 'dev')
});

module.exports = {
  debug: true,
  devtool: 'source-map',
  entry: './app/index.jsx',
  output: {
    filename: './bundle/bundle.js',
    sourceMapFilename: './bundle/bundle.js.map'
  },
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  module: {
    loaders: [{
      test: /\.jsx?$/,
      exclude: /(node_modules|bower_components)/,
      loader: 'babel',
      query: {
        presets: ['react', 'es2015']
      }
    }, {
      test: /\.scss$/,
      loaders: ['style', 'css', 'resolve-url', 'sass?sourceMap']
    }, {
      test: /\.jpe?g$|\.gif$|\.png$|\.svg$|\.woff$|\.ttf$|\.wav$|\.mp3$|\.bin$/,
      loader: 'file?name=bundle/[hash].[ext]'
    }, {
      test: /\.json$/,
      loaders: ['json']
    }]
  },
  plugins: [definePlugin],
  target: process.env.WEBPACK_TARGET || 'electron',
  devServer: {
    proxy: {
      '/api/*': {
        target: 'http://localhost:1337',
        rewrite: function (req) {
          req.url = req.url.replace(/^\/api(.+)$/, '$1');
        }
      }
    }
  }
};
