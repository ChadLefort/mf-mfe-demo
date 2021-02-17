import path from 'path';

import HtmlWebpackPlugin from 'html-webpack-plugin';
import { WebpackOptionsNormalized, container } from 'webpack';

import { ExternalTemplateRemotesPlugin } from '../../config/webpack/ExternalTemplateRemotesPlugin';
import baseWebpackConfig, { moduleFederationShared } from '../../config/webpack/webpack.config.base';

const webpackConfig = (_env: { production: string; development: string }, argv: WebpackOptionsNormalized) => {
  const { name, dependencies } = require('./package.json');
  const entry = './src/index.ts';
  const out = path.join(__dirname, '/dist');
  const config = baseWebpackConfig(name, entry, out)(argv);
  const publicPath = '/admin';

  config.output = {
    ...config.output,
    publicPath
  };

  config.devServer = {
    ...config.devServer,
    static: out,
    port: 1336,
    historyApiFallback: {
      index: publicPath
    },
    dev: {
      publicPath
    }
  };

  config.plugins = config.plugins?.concat([
    new container.ModuleFederationPlugin({
      name: '@fake-company/admin',
      remotes: {
        mfe_nav: 'mfe_nav@[__mfe_nav__]/remoteEntry.js',
        mfe_contacts: 'mfe_contacts@[__mfe_contacts__]/remoteEntry.js'
      },
      shared: {
        ...dependencies,
        ...moduleFederationShared
      }
    }),
    new ExternalTemplateRemotesPlugin(),
    new HtmlWebpackPlugin({
      favicon: '../../assets/favicon.ico',
      template: './public/index.html'
    })
  ]);

  return config;
};

export default webpackConfig;
