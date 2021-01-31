import path from 'path';

import HtmlWebpackPlugin from 'html-webpack-plugin';
import { WebpackOptionsNormalized, container } from 'webpack';

import { shared } from '../../mf-shared';
import baseWebpackConfig from '../../webpack.config.base';

const webpackConfig = (_env: { production: string; development: string }, argv: WebpackOptionsNormalized) => {
  const { name, dependencies } = require('./package.json');
  const entry = './src/index.ts';
  const out = path.join(__dirname, '/dist');
  const config = baseWebpackConfig(name, entry, out)(argv);

  config.devServer = {
    ...config.devServer,
    contentBase: out,
    port: 3002
  };

  config.plugins = config.plugins?.concat([
    new container.ModuleFederationPlugin({
      name: 'shared_common_ui',
      filename: 'remoteEntry.js',
      exposes: {
        './components/ErrorIcon': './src/components/ErrorIcon.tsx',
        './components/Layout': './src/components/Layout.tsx',
        './components/Theme': './src/components/Theme.tsx'
      },
      shared: {
        ...dependencies,
        ...shared
      }
    }),
    new HtmlWebpackPlugin({
      template: './public/index.html'
    })
  ]);

  return config;
};

export default webpackConfig;
