import baseWebpackConfig from '../../webpack.config.base';
import path from 'path';

const webpackConfig = (env: { production: string; development: string }) => {
  const { name } = require(`./package.json`);
  const config = baseWebpackConfig(name, './src/index.ts', path.join(__dirname, '/dist'))(env);
  return config;
};

export default webpackConfig;
