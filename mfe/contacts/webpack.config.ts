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
      filename: 'mfeEntry.js',
      exposes: {
        './features/core/components/AddContacts': './src/features/core/components/AddContacts.tsx',
        './features/core/components/EditContact': './src/features/core/components/EditContact.tsx',
        './features/core/components/ViewContact': './src/features/core/components/ViewContact.tsx',
        './features/core/components/ViewContacts': './src/features/core/components/ViewContacts.tsx',
        './features/core/components/ContactsProvider': './src/features/core/components/ContactsProvider.tsx'
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
