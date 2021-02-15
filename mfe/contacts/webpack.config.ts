import path from 'path';

import HtmlWebpackPlugin from 'html-webpack-plugin';
import { WebpackOptionsNormalized, container } from 'webpack';

import baseWebpackConfig, { moduleFederationShared } from '../../webpack.config.base';

const webpackConfig = (_env: { production: string; development: string }, argv: WebpackOptionsNormalized) => {
  const isDevelopment = argv.mode === 'development';
  const { name, dependencies } = require('./package.json');
  const entry = './src/index.ts';
  const out = path.join(__dirname, '/dist');
  const config = baseWebpackConfig(name, entry, out)(argv);

  config.devServer = {
    ...config.devServer,
    static: out,
    port: 1339
  };

  config.plugins?.push(
    new container.ModuleFederationPlugin({
      name: 'mfe_contacts',
      filename: 'remoteEntry.js',
      exposes: {
        './feature-core/components/AddContacts': './src/feature-core/components/AddContacts.tsx',
        './feature-core/components/EditContact': './src/feature-core/components/EditContact.tsx',
        './feature-core/components/ViewContact': './src/feature-core/components/ViewContact.tsx',
        './feature-core/components/ViewContacts': './src/feature-core/components/ViewContacts.tsx',
        './feature-core/components/ContactsProvider': './src/feature-core/components/ContactsProvider.tsx'
      },
      shared: {
        ...dependencies,
        ...moduleFederationShared
      }
    })
  );

  if (isDevelopment) {
    config.plugins?.push(
      new HtmlWebpackPlugin({
        favicon: '../../assets/favicon.ico',
        template: './public/index.html'
      })
    );
  }

  return config;
};

export default webpackConfig;
