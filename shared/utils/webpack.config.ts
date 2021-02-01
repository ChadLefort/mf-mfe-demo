import path from 'path';

import { WebpackOptionsNormalized } from 'webpack';

import baseWebpackConfig from '../../webpack.config.base';

const webpackConfig = (_env: { production: string; development: string }, argv: WebpackOptionsNormalized) => {
  const { name, peerDependencies } = require('./package.json');
  const entry = './src/index.ts';
  const out = path.join(__dirname, '/dist');
  const config = baseWebpackConfig(name, entry, out)(argv);

  config.output = {
    path: out,
    filename: 'utils.bundle.js',
    libraryTarget: 'umd',
    library: 'utils'
  };

  config.devServer = {
    ...config.devServer,
    contentBase: out,
    port: 3004
  };

  config.externals = Object.keys(peerDependencies);

  return config;
};

export default webpackConfig;
