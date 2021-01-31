import baseWebpackConfig from '../../webpack.config.base';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import path from 'path';
import { container, WebpackOptionsNormalized } from 'webpack';
import { shared } from '../../mf-shared';

const webpackConfig = (_env: { production: string; development: string }, argv: WebpackOptionsNormalized) => {
  const { name, dependencies } = require('./package.json');
  const entry = './src/index.ts';
  const out = path.join(__dirname, '/dist');
  const config = baseWebpackConfig(name, entry, out)(argv);

  config.devServer = {
    ...config.devServer,
    contentBase: out,
    port: 3001
  };

  config.plugins = config.plugins?.concat([
    new container.ModuleFederationPlugin({
      name: 'shared_nav',
      filename: 'remoteEntry.js',
      exposes: {
        './features/core/components/Nav': './src/features/core/components/Nav.tsx'
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
