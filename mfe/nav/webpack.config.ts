import path from 'path';

import HtmlWebpackPlugin from 'html-webpack-plugin';
import { WebpackOptionsNormalized, container } from 'webpack';

import baseWebpackConfig, { moduleFederationShared } from '../../webpack.config.base';

const webpackConfig = (_env: { production: string; development: string }, argv: WebpackOptionsNormalized) => {
  const isDevelopment = argv.mode === 'development';
  const { name, dependencies } = require('./package.json');
  const entry = isDevelopment ? './src/index.ts' : undefined;
  const out = path.join(__dirname, '/dist');
  const config = baseWebpackConfig(name, entry, out)(argv);

  config.devServer = {
    ...config.devServer,
    contentBase: out,
    port: 1338
  };

  config.plugins?.push(
    new container.ModuleFederationPlugin({
      name: 'mfe_nav',
      filename: 'remoteEntry.js',
      exposes: {
        './feature-core/components/Nav': './src/feature-core/components/Nav.tsx'
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
