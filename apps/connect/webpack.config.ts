import baseWebpackConfig, { moduleFederationShared } from '../../webpack.config.base';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import path from 'path';
import { container, WebpackOptionsNormalized } from 'webpack';

const webpackConfig = (_env: { production: string; development: string }, argv: WebpackOptionsNormalized) => {
  const { name, dependencies } = require('./package.json');
  const entry = './src/index.ts';
  const out = path.join(__dirname, '/dist');
  const config = baseWebpackConfig(name, entry, out)(argv);
  const isDevelopment = argv.mode === 'development';

  config.devServer = {
    ...config.devServer,
    contentBase: out,
    port: 1337
  };

  config.plugins = config.plugins?.concat([
    new container.ModuleFederationPlugin({
      name: '@fake-company/connect',
      remotes: {
        mfe_nav: isDevelopment
          ? 'mfe_nav@http://localhost:1338/mfeEntry.js'
          : 'mfe_nav@http://localhost/nav/mfeEntry.js',
        mfe_contacts: isDevelopment
          ? 'mfe_contacts@http://localhost:1339/mfeEntry.js'
          : 'mfe_contacts@http://localhost/contacts/mfeEntry.js'
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
