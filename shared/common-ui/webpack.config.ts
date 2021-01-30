import baseWebpackConfig from '../../webpack.config.base';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import path from 'path';
import { container } from 'webpack';

const webpackConfig = (env: { production: string; development: string }) => {
  const { name: moduleName, dependencies } = require(`./package.json`);
  const entry = env.development ? './src/app.tsx' : './src/index.ts';
  const out = path.join(__dirname, '/dist');
  const config = baseWebpackConfig(moduleName, entry, out)(env);

  config.devServer = {
    contentBase: path.join(__dirname, 'dist'),
    port: 3003
  };

  config.plugins = config.plugins?.concat([
    new container.ModuleFederationPlugin({
      name: 'shared_common_ui',
      library: { type: 'var', name: 'shared_common_ui' },
      filename: 'remoteEntry.js',
      exposes: {
        './components/ErrorIcon': './src/components/ErrorIcon.tsx',
        './components/Layout': './src/components/Layout.tsx',
        './components/Theme': './src/components/Theme.tsx'
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
  ])

  return config;
};

export default webpackConfig;
