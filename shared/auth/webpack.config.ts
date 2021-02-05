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
    filename: 'auth.bundle.js',
    libraryTarget: 'umd',
    library: 'auth'
  };

  config.externals = Object.keys(peerDependencies);

  return config;
};

export default webpackConfig;
