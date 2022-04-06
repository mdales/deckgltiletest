const path = require('path');
const webpack = require('webpack');

module.exports = {
  entry: './src/index.js',
  mode: 'development',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
  },
  plugins: [
    new webpack.DefinePlugin({
      MAPTILE_SERVER_HOST_AND_PORT: JSON.stringify(process.env.MAPTILE_SERVER_HOST_AND_PORT)
    })
  ]
};
