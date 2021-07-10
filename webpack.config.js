const path = require('path');

module.exports = {
  // mode: 'none',
  entry: './frontend/index.js',
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, 'public'),
  },

  // devtool: 'source-map',

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
            plugins: ['@babel/plugin-transform-runtime'],
          },
        },
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },

  devServer: {
    contentBase: path.join(__dirname, 'public'),
    overlay: true,
    port: 5000,
  },

};
