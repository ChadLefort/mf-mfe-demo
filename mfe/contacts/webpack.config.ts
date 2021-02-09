import baseWebpackConfig, { moduleFederationShared } from '../../webpack.config.base';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import path from 'path';
import { container, WebpackOptionsNormalized } from 'webpack';

const webpackConfig = (_env: { production: string; development: string }, argv: WebpackOptionsNormalized) => {
  const { name, dependencies } = require('./package.json');
  const entry = './src/index.ts';
  const out = path.join(__dirname, '/dist');
  const config = baseWebpackConfig(name, entry, out)(argv);

  config.devServer = {
    ...config.devServer,
    contentBase: out,
    port: 1339
  };

  config.plugins = config.plugins?.concat([
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
    }),
    new HtmlWebpackPlugin({
      template: './public/index.html'
    })
  ]);

  return config;
};

export default webpackConfig;
