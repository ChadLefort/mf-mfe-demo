import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';
import webpack, { Configuration } from 'webpack';
import { TsconfigPathsPlugin } from 'tsconfig-paths-webpack-plugin';
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');

const webpackConfig = (name: string, entry: string, outputPath: string) => (env: {
  production: string;
  development: string;
}): Configuration => ({
  entry,
  ...(env.production || !env.development ? {} : { devtool: 'eval-source-map' }),
  resolve: {
    plugins: [
      // @ts-ignore
      new TsconfigPathsPlugin()
    ],
    extensions: ['.ts', '.tsx', '.js']
  },
  output: {
    filename: `${name}.[contenthash].bundle.js`,
    path: outputPath,
    publicPath: 'auto'
  },
  module: {
    rules: [
      {
        test: /bootstrap\.(ts|tsx|js|jsx)$/,
        loader: 'bundle-loader',
        options: {
          lazy: true
        }
      },
      {
        test: /\.(ts|tsx|js|jsx)$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        options: {
          presets: ['@babel/preset-typescript', '@babel/preset-react', '@babel/preset-env'],
          plugins: ['@babel/transform-runtime', 'react-refresh/babel']
        }
      }
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new ReactRefreshWebpackPlugin(),
    new ForkTsCheckerWebpackPlugin({
      eslint: {
        files: './src/**/*.{ts,tsx,js,jsx}'
      }
    })
  ]
});

export default webpackConfig;
