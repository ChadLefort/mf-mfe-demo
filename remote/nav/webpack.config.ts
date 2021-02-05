import baseWebpackConfig, { moduleFederationShared } from '../../webpack.config.base';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import path from 'path';
import { container, WebpackOptionsNormalized } from 'webpack';

const DashboardPlugin = require('@module-federation/dashboard-plugin');
const webpackConfig = (_env: { production: string; development: string }, argv: WebpackOptionsNormalized) => {
  const { name, dependencies } = require('./package.json');
  const entry = './src/index.ts';
  const out = path.join(__dirname, '/dist');
  const config = baseWebpackConfig(name, entry, out)(argv);

  config.devServer = {
    ...config.devServer,
    contentBase: out,
    port: 1338
  };

  config.plugins = config.plugins?.concat([
    new container.ModuleFederationPlugin({
      name: 'remote_nav',
      filename: 'remoteEntry.js',
      exposes: {
        './features/core/components/Nav': './src/features/core/components/Nav.tsx'
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
      dashboardURL: 'http://localhost:3000/api/update',
      metadata: {
        remote: 'http://localhost:1338/remoteEntry.js'
      }
    })
  ]);

  return config;
};

export default webpackConfig;
