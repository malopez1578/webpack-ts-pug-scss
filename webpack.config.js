const path = require('path');
const glob = require('glob');
const TSLintPlugin = require('tslint-webpack-plugin');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

function generateHtmlPlugins() {
  const templates = glob.sync('./src/**/*.pug');
  return templates.map((item) => {
    const transform = item.replace('pug', 'html');
    return new HTMLWebpackPlugin({
      filename: path.resolve(__dirname, transform),
      template: path.resolve(__dirname, item),
      inject: false,
    });
  });
}

const htmlPlugins = generateHtmlPlugins();
module.exports = [
  {
    entry: glob.sync('./src/**/index.ts').reduce((acc, path) => {
      const entry = path.split('/');
      acc[entry[entry.length - 2]] = path;
      return acc;
    }, {}),
    watch: true,
    watchOptions: {
      ignored: /node_modules/,
    },
    devtool: 'inline-source-map',
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          loader: 'ts-loader',
          exclude: /node_modules/,
        },
        {
          test: /\.pug$/,
          loader: 'pug-loader',
        },
        {
          test: /\.scss$/,
          use: ['style-loader', 'css-loader', 'sass-loader'],
        },
      ],
    },
    resolve: {
      extensions: ['.ts'],
    },
    plugins: [
      new TSLintPlugin({
        files: ['./src/**/*.ts'],
      }),
    ].concat(htmlPlugins),
    output: {
      path: path.join(__dirname, './src'),
      filename: './[name]/index.js',
      libraryTarget: 'this',
    },
  },
];
