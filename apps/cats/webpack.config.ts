import baseWebpackConfig from '../../webpack.config.base';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import path from 'path';
import { container } from 'webpack';

const webpackConfig = (env: { production: string; development: string }) => {
  const { name, dependencies } = require(`./package.json`);
  const config = baseWebpackConfig(name, './src/index.ts', path.join(__dirname, '/dist'))(env);

  config.devServer = {
    contentBase: path.join(__dirname, 'dist'),
    port: 3001,
    hot: true
  };

  config.plugins = config.plugins?.concat([
    new container.ModuleFederationPlugin({
      name: 'cats',
      remotes: {
        shared_nav: 'shared_nav@http://localhost:3002/remoteEntry.js',
        shared_common_ui: 'shared_common_ui@http://localhost:3003/remoteEntry.js'
      },
      shared: {
        ...dependencies,
        react: { singleton: true },
        'react-dom': { singleton: true },
        '@material-ui/styles': { singleton: true },
        '@material-ui/core': { singleton: true }
      }
    }),
    new HtmlWebpackPlugin({
      template: './public/index.html'
    })
  ]);

  return config;
};

export default webpackConfig;
