import path from 'path';

import { CleanWebpackPlugin } from 'clean-webpack-plugin';
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';
import { TsconfigPathsPlugin } from 'tsconfig-paths-webpack-plugin';
import { Configuration, WebpackOptionsNormalized } from 'webpack';
import WebpackDevServer from 'webpack-dev-server';

declare module 'webpack' {
  interface Configuration {
    devServer?: WebpackDevServer.Configuration;
  }
}

export const moduleFederationShared = {
  axios: { singleton: true, requiredVersion: '>=0.21.1' },
  react: { singleton: true },
  'react-dom': { singleton: true },
  'react-router-dom': { singleton: true },
  '@material-ui/core': { singleton: true },
  '@material-ui/styles': { singleton: true }
};

const webpackConfig = (name: string, entry: string, outputPath: string) => (
  argv: WebpackOptionsNormalized
): Configuration => ({
  entry,
  ...(argv.mode !== 'development' ? {} : { devtool: 'inline-cheap-module-source-map' }),
  target: argv.mode !== 'development' ? 'browserslist' : 'web',
  resolve: {
    plugins: [
      // @ts-ignore
      new TsconfigPathsPlugin()
    ],
    modules: [path.join(__dirname, '/node_modules'), path.join(__dirname, '/node_modules/.pnpm/node_modules')],
    extensions: ['.ts', '.tsx', '.js']
  },
  output: {
    filename: `${name}.bundle.js`,
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
          configFile: path.join(__dirname, '/.babelrc')
        }
      }
    ]
  },
  devServer: {
    compress: true,
    stats: 'errors-warnings',
    historyApiFallback: true,
    proxy: {
      '/api': {
        target: 'http://localhost:4000',
        secure: false
      }
    }
  },
  performance: {
    hints: false,
    maxEntrypointSize: 512000,
    maxAssetSize: 512000
  },
  plugins: [
    new CleanWebpackPlugin(),
    new ForkTsCheckerWebpackPlugin({
      eslint: {
        files: './src/**/*.{ts,tsx,js,jsx}'
      }
    })
  ]
});

export default webpackConfig;
