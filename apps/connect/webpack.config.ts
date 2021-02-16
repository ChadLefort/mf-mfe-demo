import path from 'path';

import HtmlWebpackPlugin from 'html-webpack-plugin';
import { WebpackOptionsNormalized, container } from 'webpack';

import baseWebpackConfig, { moduleFederationShared } from '../../config/webpack.config.base';

const webpackConfig = (_env: { production: string; development: string }, argv: WebpackOptionsNormalized) => {
  const { name, dependencies } = require('./package.json');
  const entry = './src/index.ts';
  const out = path.join(__dirname, '/dist');
  const config = baseWebpackConfig(name, entry, out)(argv);
  const isDevelopment = argv.mode === 'development';
  const publicPath = '/connect';

  config.output = {
    ...config.output,
    publicPath
  };

  config.devServer = {
    ...config.devServer,
    static: out,
    port: 1337,
    historyApiFallback: {
      index: publicPath
    },
    dev: {
      publicPath
    }
  };

  config.plugins = config.plugins?.concat([
    new container.ModuleFederationPlugin({
      name: '@fake-company/connect',
      remotes: {
        mfe_nav: isDevelopment
          ? 'mfe_nav@http://localhost:1338/remoteEntry.js'
          : 'mfe_nav@http://localhost/nav/remoteEntry.js',
        mfe_contacts: isDevelopment
          ? 'mfe_contacts@http://localhost:1339/remoteEntry.js'
          : 'mfe_contacts@http://localhost/contacts/remoteEntry.js'
      },
      shared: {
        ...dependencies,
        ...moduleFederationShared
      }
    }),
    new HtmlWebpackPlugin({
      favicon: '../../assets/favicon.ico',
      template: './public/index.html'
    })
  ]);

  return config;
};

export default webpackConfig;
