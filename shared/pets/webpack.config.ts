import baseWebpackConfig from '../../webpack.config.base';
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
    port: 3003
  };

  config.plugins = config.plugins?.concat([
    new container.ModuleFederationPlugin({
      name: 'shared_pets',
      library: { type: 'var', name: 'shared_pets' },
      filename: 'remoteEntry.js',
      exposes: {
        './features/core/components/AddPets': './src/features/core/components/AddPets.tsx',
        './features/core/components/EditPet': './src/features/core/components/EditPet.tsx',
        './features/core/components/ViewPet': './src/features/core/components/ViewPet.tsx',
        './features/core/components/ViewPets': './src/features/core/components/ViewPets.tsx',
        './features/core/components/RemoteWrapper': './src/features/core/components/RemoteWrapper.tsx'
      },
      shared: {
        ...dependencies,
        axios: { singleton: true },
        react: { singleton: true },
        'react-dom': { singleton: true },
        'react-router-dom': { singleton: true },
        '@material-ui/styles': { singleton: true }
      }
    }),
    new HtmlWebpackPlugin({
      template: './public/index.html'
    })
  ]);

  return config;
};

export default webpackConfig;
