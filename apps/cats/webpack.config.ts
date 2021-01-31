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

  config.output = {
    ...config.output,
    publicPath: '/'
  };

  config.devServer = {
    ...config.devServer,
    contentBase: out,
    port: 3000
  };

  config.plugins = config.plugins?.concat([
    new container.ModuleFederationPlugin({
      name: 'cats',
      remotes: {
        shared_nav: 'shared_nav@http://localhost:3001/remoteEntry.js',
        shared_common_ui: 'shared_common_ui@http://localhost:3002/remoteEntry.js',
        shared_pets: 'shared_pets@http://localhost:3003/remoteEntry.js'
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
