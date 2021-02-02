import path from 'path';

import HtmlWebpackPlugin from 'html-webpack-plugin';
import { WebpackOptionsNormalized, container } from 'webpack';

import baseWebpackConfig, { moduleFederationShared } from '../../webpack.config.base';

const DashboardPlugin = require('@module-federation/dashboard-plugin');
const webpackConfig = (_env: { production: string; development: string }, argv: WebpackOptionsNormalized) => {
  const { name, dependencies } = require('./package.json');
  const entry = './src/index.ts';
  const out = path.join(__dirname, '/dist');
  const config = baseWebpackConfig(name, entry, out)(argv);

  config.output = {
    ...config.output,
    publicPath: '/'
  };

  config.devServer = {
    ...config.devServer,
    contentBase: out,
    port: 1337
  };

  config.plugins = config.plugins?.concat([
    new container.ModuleFederationPlugin({
      name: 'host_cats',
      remotes: {
        shared_nav: 'shared_nav@http://localhost:3001/remoteEntry.js',
        shared_pets: 'shared_pets@http://localhost:3002/remoteEntry.js'
      },
      shared: {
        ...dependencies,
        ...moduleFederationShared
      }
    }),
    new HtmlWebpackPlugin({
      template: './public/index.html'
    }),
    new DashboardPlugin({
      filename: 'dashboard.json',
      dashboardURL: 'http://localhost:3000/api/update'
    })
  ]);

  return config;
};

export default webpackConfig;
