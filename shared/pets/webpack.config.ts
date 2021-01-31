import baseWebpackConfig from '../../webpack.config.base';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import path from 'path';
import { container } from 'webpack';

const webpackConfig = (env: { production: string; development: string }) => {
  const { name: moduleName, dependencies } = require(`./package.json`);
  const out = path.join(__dirname, '/dist');
  const config = baseWebpackConfig(moduleName, './src/index.ts', out)(env);

  config.devServer = {
    contentBase: path.join(__dirname, 'dist'),
    port: 3004,
    hot: true
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
        '@material-ui/styles': { singleton: true },
        'styled-components': { singleton: true }
      }
    }),
    new HtmlWebpackPlugin({
      template: './public/index.html'
    })
  ]);

  return config;
};

export default webpackConfig;
